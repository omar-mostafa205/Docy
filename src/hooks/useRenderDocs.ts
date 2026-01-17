import { api } from '@/trpc/react';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';


type Doc = {
  id: string
  title?: string
  description?: string
  body: string | object
  type: string
  createdAt: string
  updatedAt: string   
}
export function useRenderDocs() {
    const [selectedDocId, setSelectedDocId] = useState("");
    const { repoId } = useParams();
    const router = useRouter();
    
    const { data: allDocs, isLoading } = api.project.getDocs.useQuery({
      id: repoId as string,
    });
  
    const getTypeLabel = (type : string) => {
      switch(type) {
        case 'API':
          return 'API Reference';
        case 'TECHNICAL':
          return 'Technical Documentation';
        default:
          return 'Documentation';
      }
    };
  
    const getDocTitle = (type : string) => {
      switch(type) {
        case 'API':
          return 'API Documentation';
        case 'TECHNICAL':
          return 'Technical Documentation';
        default:
          return 'Comprehensive Documentation';
      }
    };
  
    const getDocDescription = (type : string) => {
      switch(type) {
        case 'API':
          return 'Complete API reference and integration guides';
        case 'TECHNICAL':
          return 'In-depth technical documentation and architecture guides';
        default:
          return 'Complete technical and API reference documentation';
      }
    };
  
    const getMostRecentDoc = () => {
      if (!allDocs || allDocs.length === 0) return null;
      return allDocs.reduce((latest, doc) => {
        return new Date(doc.createdAt) > new Date(latest.createdAt) ? doc : latest;
      });
    };
  
    const mostRecentDoc = getMostRecentDoc();
    const handleExportMarkdown = (doc: Doc) => {
      let body = typeof doc.body === 'string' ? doc.body : JSON.stringify(doc.body);
      
      body = sanitizeDocumentation(body);
      
      const blob = new Blob([body], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${doc.type.toLowerCase()}-documentation.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
    
    const sanitizeDocumentation = (content: string): string => {
      return content
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
        .replace(/```(\w+)\n\n/g, '```$1\n')
        .replace(/\n\n```/g, '\n```')
        .trim() + '\n';
    };
    
    const handleDownloadPDF = async (doc: Doc) => {
      alert('PDF download functionality - implement with jsPDF or similar library');
    };
  
    const handleView = (docId : string) => {
      setSelectedDocId(docId);
    };
  
    const handleCreateDocumentation = () => {
      router.push('/upload-repo');
    };

        return {
            selectedDocId,
            setSelectedDocId,
            allDocs,
            isLoading,
            getTypeLabel,
            getDocTitle,
            getDocDescription,
            getMostRecentDoc,
            mostRecentDoc,
            handleExportMarkdown,
            handleDownloadPDF,
            handleView,
            handleCreateDocumentation
        }
}