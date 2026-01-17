'use client'
import { useParams } from 'next/navigation'
import { useDocs } from '@/hooks/useDocs'
import { useDocumentSelection } from '@/hooks/useDocumentSelection'
import { useDocumentActions } from '@/hooks/useDocumentActions'
import { getMostRecentDoc } from '@/lib/utils'
import { DocumentLoadingSkeleton } from './DocumentLoadingSkeleton'
import { EmptyDocumentState } from './EmptyDocumentState'
import { DocumentGrid } from './DocumentGrid'
import DisplayDoc from '@/components/dashboard/DisplayDoc'
import { getTypeLabel, getDocTitle } from '@/lib/utils'

export default function RenderDocs() {
  const { repoId } = useParams()
  const { docs, isLoading } = useDocs({ repoId: repoId as string })
  const { selectedDoc, selectDoc, clearSelection } = useDocumentSelection(docs)
  const { 
    handleExportMarkdown, 
    handleDownloadPDF, 
    handleCreateDocumentation 
  } = useDocumentActions()
  
  const mostRecentDoc = getMostRecentDoc(docs)
  
  if (isLoading) {
    return <DocumentLoadingSkeleton />
  }
  
  if (docs.length === 0) {
    return <EmptyDocumentState onCreateDocumentation={handleCreateDocumentation} />
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedDoc ? (
          <DocumentGrid
            docs={docs}
            mostRecentDocId={mostRecentDoc?.id ?? null}
            onView={selectDoc}
            onExportMarkdown={handleExportMarkdown}
            onDownloadPDF={handleDownloadPDF}
          />
        ) : (
          <DisplayDoc
            selectedDoc={selectedDoc}
            onBack={clearSelection}
            getTypeLabel={getTypeLabel}
            getDocTitle={getDocTitle}
            handleExportMarkdown={handleExportMarkdown}
          />
        )}
      </div>
    </div>
  )
}