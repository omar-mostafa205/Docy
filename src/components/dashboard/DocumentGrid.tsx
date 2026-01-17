
import { Clock } from 'lucide-react'
import DocCard from '@/components/dashboard/DocCard'
import { getTypeLabel, getDocTitle, getDocDescription } from '@/lib/utils'

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

interface DocumentGridProps {
  docs: Doc[]
  mostRecentDocId: string | null
  onView: (docId: string) => void
  onExportMarkdown: (doc: Doc) => void
  onDownloadPDF: (doc: Doc) => void
}

export function DocumentGrid({
  docs,
  mostRecentDocId,
  onView,
  onExportMarkdown,
  onDownloadPDF
}: DocumentGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {docs.map((doc) => (
        <div key={doc.id} className="relative">
          {mostRecentDocId === doc.id && (
            <div className="absolute -top-3 left-4 z-10">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-medium">
                <Clock className="w-3 h-3" />
                <span>Last created</span>
              </div>
            </div>
          )}
          
          <DocCard 
            doc={doc}
            handleView={onView}  
            getTypeLabel={getTypeLabel}
            getDocTitle={getDocTitle}
            getDocDescription={getDocDescription}
            handleExportMarkdown={onExportMarkdown}
            handleDownloadPDF={onDownloadPDF}
          />
        </div>
      ))}
    </div>
  )
}