// hooks/useDocumentSelection.ts
import { useState } from 'react'

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
export function useDocumentSelection(docs: Doc[]) {
  const [selectedDocId, setSelectedDocId] = useState<string>("")
  
  const selectedDoc = docs.find(doc => doc.id === selectedDocId)
  
  const selectDoc = (docId: string) => {
    setSelectedDocId(docId)
  }
  
  const clearSelection = () => {
    setSelectedDocId("")
  }
  
  return {
    selectedDoc,
    selectDoc,
    clearSelection,
    hasSelection: !!selectedDoc
  }
}