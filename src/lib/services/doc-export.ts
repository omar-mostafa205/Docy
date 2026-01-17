import { sanitizeDocumentation } from '@/lib/utils'
export interface Doc {
    id: string
    title?: string
    description?: string
    body: string | object
    type: DocType
    createdAt: string
    updatedAt: string
  }
  
  export type DocType = 'API' | 'TECHNICAL'

export function exportDocAsMarkdown(doc: Doc): void {
  let body = typeof doc.body === 'string' ? doc.body : JSON.stringify(doc.body)
  body = sanitizeDocumentation(body)
  
  const blob = new Blob([body], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  
  a.href = url
  a.download = `${doc.type.toLowerCase()}-documentation.md`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function exportDocAsPDF(doc: Doc): Promise<void> {
  alert('PDF download functionality - implement with jsPDF or similar library')
}