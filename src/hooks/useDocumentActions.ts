import { useRouter } from 'next/navigation'
import { exportDocAsMarkdown, exportDocAsPDF } from '@/lib/services/doc-export'

export interface Doc {
    id: string
    title?: string
    description?: string
    body: string | object
    type: DocType
    createdAt: string
    updatedAt: string
  }
  type DocType = 'API' | 'TECHNICAL' | 'BOTH'

export function useDocumentActions() {
  const router = useRouter()
  
  const handleExportMarkdown = (doc: Doc) => {
    exportDocAsMarkdown(doc)
  }
  
  const handleDownloadPDF = async (doc: Doc) => {
    await exportDocAsPDF(doc)
  }
  
  const handleCreateDocumentation = () => {
    router.push('/upload-repo')
  }
  
  return {
    handleExportMarkdown,
    handleDownloadPDF,
    handleCreateDocumentation
  }
}