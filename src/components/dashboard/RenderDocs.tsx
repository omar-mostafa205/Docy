'use client';
import React, { useState } from 'react';
import { FileText , Plus, Clock } from 'lucide-react';
import { api } from '@/trpc/react';
import { useRouter, useParams } from 'next/navigation';
import DocCard from '@/components/dashboard/DocCard';
import DisplayDoc from '@/components/dashboard/DisplayDoc';

type Doc = {
  id: string
  title?: string
  description?: string
  body: string | object
  type: string
  createdAt: string
  updatedAt: string   
}

const RenderDocs = () => {
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

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
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

  const selectedDoc = allDocs?.find(doc => doc.id === selectedDocId);

  if (isLoading) {
    return (
      
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 min-h-[280px] animate-pulse shadow-sm">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="flex gap-3 mt-auto">
                  <div className="h-10 bg-gray-200 rounded flex-1"></div>
                  <div className="h-10 bg-gray-200 rounded w-10"></div>
                  <div className="h-10 bg-gray-200 rounded w-10"></div>
                </div>
              </div>
            ))}
          </div>
    );
  }

  if (!allDocs || allDocs.length === 0) {
    return (
<div className="min-h-screen bg-gray-50 flex items-start justify-center pt-20">
        <div className="text-center max-w-2xl mx-auto px-4 w-full">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 px-20">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-[#fa5028]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Documentation Found</h2>
            <p className="text-gray-600 mb-8">
              No documentation has been generated for this repository yet. Get started by creating your first documentation.
            </p>
            <button
              onClick={handleCreateDocumentation}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#fa5028] text-white rounded-lg hover:bg-[#fa4e28d4] transition-colors font-semibold shadow-sm cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Create Documentation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!selectedDoc && (
        <div className="">
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedDoc ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {allDocs.map((doc) => (
              <div key={doc.id} className="relative">
                {mostRecentDoc?.id === doc.id && (
                  <div className="absolute -top-3 left-4 z-10">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-medium">
                      <Clock className="w-3 h-3" />
                      <span>Last created</span>
                    </div>
                  </div>
                )}
                
                <DocCard 
                  doc={doc}
                  handleView={handleView}  
                  getTypeLabel={getTypeLabel}
                  getDocTitle={getDocTitle}
                  getDocDescription={getDocDescription}
                  handleExportMarkdown={handleExportMarkdown}
                  handleDownloadPDF={handleDownloadPDF}
                />
              </div>
            ))}
          </div>
        ) : (
          <DisplayDoc
            selectedDoc={selectedDoc}
            onBack={() => setSelectedDocId("")}
            getTypeLabel={getTypeLabel}
            getDocTitle={getDocTitle}
            handleExportMarkdown={handleExportMarkdown}
          />
        )}
      </div>
    </div>
  );
};

export default RenderDocs;