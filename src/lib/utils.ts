import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

type DocType = 'API' | 'TECHNICAL' | 'BOTH'
export interface Doc {
  id: string
  title?: string
  description?: string
  body: string | object
  type: DocType
  createdAt: string
  updatedAt: string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays < 1) return 'today';
  if (diffInDays === 1) return '1d ago';
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
  if (diffInDays < 60) return 'about 1mo ago';
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}mo ago`;
  return `${Math.floor(diffInDays / 365)}y ago`;
}

export function getTypeLabel(type: DocType): string {
  switch(type) {
    case 'API':
      return 'API Reference'
    case 'TECHNICAL':
      return 'Technical Documentation'
    default:
      return 'Documentation'
  }
}

export function getDocTitle(type: DocType): string {
  switch(type) {
    case 'API':
      return 'API Documentation'
    case 'TECHNICAL':
      return 'Technical Documentation'
    default:
      return 'Comprehensive Documentation'
  }
}

export function getDocDescription(type: DocType): string {
  switch(type) {
    case 'API':
      return 'Complete API reference and integration guides'
    case 'TECHNICAL':
      return 'In-depth technical documentation and architecture guides'
    default:
      return 'Complete technical and API reference documentation'
  }
}


export function getMostRecentDoc(docs: Doc[]): Doc | null {
  if (docs.length === 0) return null
  
  return docs.reduce((latest, doc) => {
    return new Date(doc.createdAt) > new Date(latest.createdAt) ? doc : latest
  })
}


export function sanitizeDocumentation(content: string): string {
  const mermaidBlocks: string[] = []
  const mermaidPlaceholder = '___MERMAID_BLOCK___'
  
  let processedContent = content.replace(
    /```mermaid\n([\s\S]*?)```/g,
    (match) => {
      mermaidBlocks.push(match)
      return `${mermaidPlaceholder}${mermaidBlocks.length - 1}`
    }
  )
  
  // Step 2: Extract and protect ALL code blocks (not just Mermaid)
  const codeBlocks: string[] = []
  const codePlaceholder = '___CODE_BLOCK___'
  
  processedContent = processedContent.replace(
    /```(\w+)\n([\s\S]*?)```/g,
    (match) => {
      codeBlocks.push(match)
      return `${codePlaceholder}${codeBlocks.length - 1}`
    }
  )
  
  processedContent = processedContent
    .replace(/^"/, '')
    .replace(/"$/, '')
    .replace(/\\n/g, '\n')
    .replace(/\\"/g, '"')
    .replace(/\\\\\\\\/g, '\\')
    .replace(/\\\\/g, '\\')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\n\*   /g, '\n* ')
    .replace(/\|\s{2,}/g, '| ')
    .replace(/\s{2,}\|/g, ' |')
    .replace(/ +$/gm, '')
    .replace(/\n(#{1,6} .+)\n/g, '\n\n$1\n\n')
  
  codeBlocks.forEach((block, index) => {
    processedContent = processedContent.replace(
      `${codePlaceholder}${index}`,
      block
    )
  })
  
  mermaidBlocks.forEach((block, index) => {
    processedContent = processedContent.replace(
      `${mermaidPlaceholder}${index}`,
      block
    )
  })
  
  return processedContent.trim() + '\n'
}