import axios from "axios";

type RepoProvider = 'github' | 'gitlab' | 'azure';

interface RepoInfo {
    provider: RepoProvider;
    owner: string;
    repo: string;
    branch?: string;
}

function detectProvider(url: string): RepoProvider {
    console.log('🔍 [detectProvider] Input URL:', url);
    
    if (url.includes('github.com')) {
        console.log('✅ [detectProvider] Detected: GitHub');
        return 'github';
    }
    if (url.includes('gitlab.com')) {
        console.log('✅ [detectProvider] Detected: GitLab');
        return 'gitlab';
    }
    if (url.includes('dev.azure.com') || url.includes('visualstudio.com')) {
        console.log('✅ [detectProvider] Detected: Azure DevOps');
        return 'azure';
    }
    
    console.error('❌ [detectProvider] Unsupported provider');
    throw new Error('Unsupported repository provider. Only GitHub, GitLab, and Azure DevOps are supported.');
}

function parseRepoUrl(url: string): RepoInfo {
    console.log('📝 [parseRepoUrl] Parsing URL:', url);
    
    const provider = detectProvider(url);
    
    if (provider === 'github') {
        const urlPath = url.replace(/https?:\/\/github\.com\//, "");
        console.log('🔗 [parseRepoUrl] GitHub URL path:', urlPath);
        
        const [owner, repo] = urlPath.split("/");
        
        if (!owner || !repo) {
            console.error('❌ [parseRepoUrl] Invalid GitHub URL format');
            throw new Error('Invalid GitHub URL format. Expected: https://github.com/owner/repo');
        }
        
        const cleanRepo = repo.replace('.git', '');
        const repoInfo = { provider, owner, repo: cleanRepo, branch: 'main' };
        console.log('✅ [parseRepoUrl] Parsed GitHub repo:', repoInfo);
        
        return repoInfo;
    }
    
    if (provider === 'gitlab') {
        const urlPath = url.replace(/https?:\/\/gitlab\.com\//, "");
        console.log('🔗 [parseRepoUrl] GitLab URL path:', urlPath);
        
        const parts = urlPath.split("/");
        
        if (parts.length < 2) {
            console.error('❌ [parseRepoUrl] Invalid GitLab URL format');
            throw new Error('Invalid GitLab URL format. Expected: https://gitlab.com/owner/repo');
        }
        
        const owner = parts[0]!;
        const repo = parts.slice(1).join('/').replace('.git', '');
        const repoInfo = { provider, owner, repo, branch: 'main' };
        console.log('✅ [parseRepoUrl] Parsed GitLab repo:', repoInfo);
        
        return repoInfo;
    }
    
    if (provider === 'azure') {
        const match = url.match(/dev\.azure\.com\/([^\/]+)\/([^\/]+)\/_git\/([^\/]+)/);
        console.log('🔗 [parseRepoUrl] Azure URL match:', match);
        
        if (!match) {
            console.error('❌ [parseRepoUrl] Invalid Azure DevOps URL format');
            throw new Error('Invalid Azure DevOps URL format. Expected: https://dev.azure.com/org/project/_git/repo');
        }
        
        const [, organization, project, repo] = match;
        const repoInfo = { 
            provider, 
            owner: `${organization}/${project}`, 
            repo: repo!.replace('.git', ''),
            branch: 'main'
        };
        console.log('✅ [parseRepoUrl] Parsed Azure repo:', repoInfo);
        
        return repoInfo;
    }
    
    console.error('❌ [parseRepoUrl] Unable to parse URL');
    throw new Error('Unable to parse repository URL');
}

function buildDownloadUrl(repoInfo: RepoInfo): string {
    console.log('🔨 [buildDownloadUrl] Building URL for:', repoInfo);
    
    const { provider, owner, repo, branch = 'main' } = repoInfo;
    let downloadUrl: string;
    
    switch (provider) {
        case 'github':
            downloadUrl = `https://api.github.com/repos/${owner}/${repo}/zipball/${branch}`;
            console.log('✅ [buildDownloadUrl] GitHub URL:', downloadUrl);
            return downloadUrl;
            
        case 'gitlab':
            const projectPath = encodeURIComponent(`${owner}/${repo}`);
            downloadUrl = `https://gitlab.com/api/v4/projects/${projectPath}/repository/archive.zip?sha=${branch}`;
            console.log('✅ [buildDownloadUrl] GitLab URL:', downloadUrl);
            return downloadUrl;
            
        case 'azure':
            const [organization, project] = owner.split('/');
            downloadUrl = `https://dev.azure.com/${organization}/${project}/_apis/git/repositories/${repo}/items?path=/&versionDescriptor[versionType]=branch&versionDescriptor[version]=${branch}&$format=zip&api-version=7.0`;
            console.log('✅ [buildDownloadUrl] Azure URL:', downloadUrl);
            return downloadUrl;
            
        default:
            console.error('❌ [buildDownloadUrl] Unsupported provider:', provider);
            throw new Error('Unsupported provider');
    }
}

function buildHeaders(provider: RepoProvider, token: string): Record<string, string> {
    console.log('🔑 [buildHeaders] Building headers for:', provider);
    console.log('🔑 [buildHeaders] Token length:', token.length);
    
    let headers: Record<string, string>;
    
    switch (provider) {
        case 'github':
            headers = {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json'
            };
            console.log('✅ [buildHeaders] GitHub headers ready');
            return headers;
            
        case 'gitlab':
            headers = {
                'PRIVATE-TOKEN': token,
                Accept: 'application/json'
            };
            console.log('✅ [buildHeaders] GitLab headers ready');
            return headers;
            
        case 'azure':
            headers = {
                Authorization: `Basic ${Buffer.from(`:${token}`).toString('base64')}`,
                Accept: 'application/zip'
            };
            console.log('✅ [buildHeaders] Azure headers ready');
            return headers;
            
        default:
            console.error('❌ [buildHeaders] Unsupported provider:', provider);
            throw new Error('Unsupported provider');
    }
}

export async function downloadRepo(repoUrl: string, repoToken: string): Promise<Buffer | null> {
    console.log('🚀 [downloadRepo] Starting download...');
    console.log('📍 [downloadRepo] Repo URL:', repoUrl);
    console.log('🔐 [downloadRepo] Token provided:', !!repoToken);
    
    try {
        if (!repoUrl || !repoToken) {
            console.error('❌ [downloadRepo] Missing required parameters');
            throw new Error('Repository URL and access token are required');
        }
        
        const repoInfo = parseRepoUrl(repoUrl);
        const downloadUrl = buildDownloadUrl(repoInfo);
        const headers = buildHeaders(repoInfo.provider, repoToken);
        
        console.log('📥 [downloadRepo] Making request to:', downloadUrl);
        console.log('📋 [downloadRepo] Request headers:', { ...headers, Authorization: '[REDACTED]' });
        
        const res = await axios.get(downloadUrl, {
            headers,
            responseType: "arraybuffer",
            maxRedirects: 5,
        });
        
        console.log('✅ [downloadRepo] Response status:', res.status);
        console.log('📦 [downloadRepo] Response size:', res.data.length, 'bytes');
        
        const buffer = Buffer.from(res.data);
        
        if (buffer.length === 0) {
            console.error('❌ [downloadRepo] Downloaded file is empty');
            throw new Error('Downloaded file is empty');
        }
        
        console.log('✅ [downloadRepo] Buffer created, size:', buffer.length, 'bytes');
        console.log('🎉 [downloadRepo] Download completed successfully!');
        
        return buffer;
        
    } catch (error) {
        console.error('💥 [downloadRepo] Error occurred:', error);
        
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            console.error('📊 [downloadRepo] Response status:', status);
            console.error('📄 [downloadRepo] Response data:', error.response?.data);
            console.error('📋 [downloadRepo] Response headers:', error.response?.headers);
            
            if (status === 401) {
                console.error('🔒 [downloadRepo] Authentication failed');
                throw new Error('Invalid or expired access token');
            } else if (status === 404) {
                console.error('🔍 [downloadRepo] Repository not found');
                throw new Error('Repository not found or not accessible');
            } else if (status === 403) {
                console.error('⛔ [downloadRepo] Access forbidden');
                throw new Error('Access forbidden. Check your token permissions');
            } else if (status === 400) {
                console.error('❌ [downloadRepo] Bad request');
                throw new Error('Bad request. Please check the repository URL and branch name');
            }
        }
        
        console.error('❌ [downloadRepo] Unhandled error:', error);
        throw error instanceof Error ? error : new Error('Failed to download repository');
    }
}