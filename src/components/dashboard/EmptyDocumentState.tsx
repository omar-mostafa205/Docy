import { FileText, Plus } from 'lucide-react'

interface EmptyDocumentStateProps {
  onCreateDocumentation: () => void
}

export function EmptyDocumentState({ onCreateDocumentation }: EmptyDocumentStateProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-20">
      <div className="text-center max-w-2xl mx-auto px-4 w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 px-20">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-[#fa5028]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            No Documentation Found
          </h2>
          <p className="text-gray-600 mb-8">
            No documentation has been generated for this repository yet. Get started by creating your first documentation.
          </p>
          <button
            onClick={onCreateDocumentation}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#fa5028] text-white rounded-lg hover:bg-[#fa4e28d4] transition-colors font-semibold shadow-sm cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Create Documentation
          </button>
        </div>
      </div>
    </div>
  )
}