/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import fs from "fs/promises";
import AdmZip from "adm-zip";
import os from "os";
import path from "path";
import { parseFile } from "./ast";
import type { ParsedFile } from "./types";

export const IGNORED_PATTERNS = new Set([
  'node_modules', 'vendor', '.pnp', '.yarn', 'bower_components',
  '.git', '.svn', '.hg', '.gitignore', '.gitattributes',
  'dist', 'build', 'out', '.next', '.nuxt', 'target', 'bin', 'obj', 
  'coverage', '.nyc_output', '*.min.js', '*.min.css',
  '.vscode', '.idea', '*.swp', '*.swo', '*.sublime-*', '.editorconfig',
  '.DS_Store', 'Thumbs.db', 'desktop.ini',
  'logs', '*.log', 'tmp', 'temp', '.cache', '*.pid', '*.seed',
  'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'composer.lock',
  'Gemfile.lock', 'Pipfile.lock', 'poetry.lock', 'Cargo.lock',
  '*.jpg', '*.jpeg', '*.png', '*.gif', '*.svg', '*.ico', '*.webp',
  '*.mp4', '*.avi', '*.mov', '*.mp3', '*.wav', '*.ogg',
  '*.pdf', '*.psd', '*.ai', '*.sketch',
  '*.woff', '*.woff2', '*.ttf', '*.eot', '*.otf',
  '*.zip', '*.tar', '*.gz', '*.rar', '*.7z',
  'coverage', '.coverage', 'htmlcov', '.pytest_cache', '__pycache__',
  'docs/_build', 'site', '_site',
  '.env', '.env.local', '.env.*.local',
  '*.class', '*.dll', '*.exe', '*.o', '*.so',
]);

const SUPPORTED_EXTENSIONS = new Set([
  '.js', '.ts', '.tsx', '.jsx',
  '.py', '.java', '.go', '.rs',
  '.php', '.rb', '.c', '.cpp',
  '.cc', '.cxx', '.h', '.hpp',
  '.cs', '.css', '.html', '.json',
  '.sh', '.bash', '.yml', '.yaml',
  '.sql'
]);

function getLanguageFromExtension(ext: string): string {
  const langMap: Record<string, string> = {
    '.js': 'javascript',
    '.jsx': 'javascript',
    '.ts': 'typescript',
    '.tsx': 'typescript',
    '.py': 'python',
    '.java': 'java',
    '.go': 'go',
    '.rs': 'rust',
    '.php': 'php',
    '.rb': 'ruby',
    '.html': 'html',
    '.css': 'css',
    '.json': 'json',
    '.c': 'c',
    '.cpp': 'cpp',
    '.cc': 'cpp',
    '.cxx': 'cpp',
    '.h': 'cpp',
    '.hpp': 'cpp',
    '.cs': 'csharp',
    '.sh': 'bash',
    '.bash': 'bash',
    '.yml': 'yaml',
    '.yaml': 'yaml',
    '.sql': 'sql'
  };
  return langMap[ext] || 'unknown';
}

export async function extractFile(zipFile : Buffer ): Promise<ParsedFile[]> { 

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'repo-'));
  const parsedFiles: ParsedFile[] = [];
  
  try {
    const zip = new AdmZip(zipFile);
    zip.extractAllTo(tempDir, true);
    
    async function walkFile(dir: string): Promise<void> {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.relative(tempDir, fullPath);
        
        if (entry.isDirectory()) {
          if (!isIgnoredFile(relativePath) && !isIgnoredFile(entry.name)) {
            await walkFile(fullPath);
          }
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name);
          
          if (!isIgnoredFile(relativePath) && 
              !isIgnoredFile(entry.name) && 
              SUPPORTED_EXTENSIONS.has(ext)) {
            try {
              const content = await fs.readFile(fullPath);
              
              const ast = await parseFile(content, ext, relativePath);
              
              if (ast) {
                const lineCount = content.toString('utf-8').split('\n').length;
                parsedFiles.push({
                  filePath: fullPath,
                  relativePath: relativePath,
                  language: getLanguageFromExtension(ext) as any,
                  functions: ast.functions || [],
                  imports: ast.imports || [],
                  exports: ast.exports || [],
                  classes: ast.classes || [],
                  variables: ast.variables || [],
                  interfaces: ast.interfaces || [],
                  types: ast.types || [],
                  lineCount: lineCount
                });
              }
            } catch (error) {
              console.error(`Error parsing file ${relativePath}:`, error);
            }
          }
        }
      }
    }
    
    await walkFile(tempDir);
    
  } catch (error) {
    console.error('Error extracting or processing zip file:', error);
    throw error;
  } finally {
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch (cleanupError) {
      console.error('Error cleaning up temp directory:', cleanupError);
    }
  }
  
  return parsedFiles;
}

function isIgnoredFile(filePath: string): boolean {
  const normalPath = filePath.toLowerCase().replace(/\\/g, "/");
  
  for (const pattern of IGNORED_PATTERNS) {
    if (pattern.includes('*.')) {
      const ext = pattern.substring(1);
      if (normalPath.endsWith(ext)) {
        return true;
      }
    } else {
      const parts = normalPath.split('/');
      if (parts.includes(pattern) || 
          normalPath.includes(`/${pattern}/`) ||
          normalPath.startsWith(`${pattern}/`)) {
        return true;
      }
    }
  }
  
  return false;
}