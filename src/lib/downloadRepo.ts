import axios from "axios";

type RepoProvider = 'github' | 'gitlab' | 'azure';

interface RepoInfo {
    provider: RepoProvider;
    owner: string;
    repo: string;
    branch?: string;
}

function detectProvider(url: string): RepoProvider {
    if (url.includes('github.com')) {
        return 'github';
    }
    if (url.includes('gitlab.com')) {
        return 'gitlab';
    }
    if (url.includes('dev.azure.com') || url.includes('visualstudio.com')) {
        return 'azure';
    }
    
    throw new Error('Unsupported repository provider. Only GitHub, GitLab, and Azure DevOps are supported.');
}

function parseRepoUrl(url: string): RepoInfo {
    const provider = detectProvider(url);
    
    if (provider === 'github') {
        const urlPath = url.replace(/https?:\/\/github\.com\//, "");
        const [owner, repo] = urlPath.split("/");
        
        if (!owner || !repo) {
            throw new Error('Invalid GitHub URL format. Expected: https://github.com/owner/repo');
        }
        
        const cleanRepo = repo.replace('.git', '');
        return { provider, owner, repo: cleanRepo, branch: 'main' };
    }
    
    if (provider === 'gitlab') {
        const urlPath = url.replace(/https?:\/\/gitlab\.com\//, "");
        const parts = urlPath.split("/");
        
        if (parts.length < 2) {
            throw new Error('Invalid GitLab URL format. Expected: https://gitlab.com/owner/repo');
        }
        
        const owner = parts[0]!;
        const repo = parts.slice(1).join('/').replace('.git', '');
        return { provider, owner, repo, branch: 'main' };
    }
    
    if (provider === 'azure') {
        const match = url.match(/dev\.azure\.com\/([^\/]+)\/([^\/]+)\/_git\/([^\/]+)/);
        
        if (!match) {
            throw new Error('Invalid Azure DevOps URL format. Expected: https://dev.azure.com/org/project/_git/repo');
        }
        
        const [, organization, project, repo] = match;
        return { 
            provider, 
            owner: `${organization}/${project}`, 
            repo: repo!.replace('.git', ''),
            branch: 'main'
        };
    }
    
    throw new Error('Unable to parse repository URL');
}

function buildDownloadUrl(repoInfo: RepoInfo): string {
    const { provider, owner, repo, branch = 'main' } = repoInfo;
    
    switch (provider) {
        case 'github':
            return `https://api.github.com/repos/${owner}/${repo}/zipball/${branch}`;
            
        case 'gitlab':
            const projectPath = encodeURIComponent(`${owner}/${repo}`);
            return `https://gitlab.com/api/v4/projects/${projectPath}/repository/archive.zip?sha=${branch}`;
            
        case 'azure':
            const [organization, project] = owner.split('/');
            return `https://dev.azure.com/${organization}/${project}/_apis/git/repositories/${repo}/items?path=/&versionDescriptor[versionType]=branch&versionDescriptor[version]=${branch}&$format=zip&api-version=7.0`;
            
        default:
            throw new Error('Unsupported provider');
    }
}

function buildHeaders(provider: RepoProvider, token: string): Record<string, string> {
    switch (provider) {
        case 'github':
            return {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json'
            };
            
        case 'gitlab':
            return {
                'PRIVATE-TOKEN': token,
                Accept: 'application/json'
            };
            
        case 'azure':
            return {
                Authorization: `Basic ${Buffer.from(`:${token}`).toString('base64')}`,
                Accept: 'application/zip'
            };
            
        default:
            throw new Error('Unsupported provider');
    }
}

export async function downloadRepo(repoUrl: string, repoToken: string): Promise<Buffer | null> {
    try {
        if (!repoUrl || !repoToken) {
            throw new Error('Repository URL and access token are required');
        }
        
        const repoInfo = parseRepoUrl(repoUrl);
        const downloadUrl = buildDownloadUrl(repoInfo);
        const headers = buildHeaders(repoInfo.provider, repoToken);
        
        const res = await axios.get(downloadUrl, {
            headers,
            responseType: "arraybuffer",
            maxRedirects: 5,
        });
        
        const buffer = Buffer.from(res.data);
        
        if (buffer.length === 0) {
            throw new Error('Downloaded file is empty');
        }
        
        return buffer;
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            
            if (status === 401) {
                throw new Error('Invalid or expired access token');
            } else if (status === 404) {
                throw new Error('Repository not found or not accessible');
            } else if (status === 403) {
                throw new Error('Access forbidden. Check your token permissions');
            } else if (status === 400) {
                throw new Error('Bad request. Please check the repository URL and branch name');
            }
        }
        
        throw error instanceof Error ? error : new Error('Failed to download repository');
    }
}