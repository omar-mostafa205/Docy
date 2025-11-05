'use client';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import {  ArrowUp, FileDown } from 'lucide-react';
import RenderDocument from '@/components/RenderDocument';
;


interface DisplayDocProps {
  selectedDoc: {
    id: string;
    body: string | object;
    type: string;
    updatedAt: string;
  };
  onBack: () => void;
  getTypeLabel: (type: string) => string;
  getDocTitle: (type: string) => string;
  handleExportMarkdown: (doc: any) => void;
  handleDownloadPDF: (doc: any) => void;
}

const DisplayDoc = ({
  selectedDoc,
  onBack,
  getTypeLabel,
  getDocTitle,
  handleExportMarkdown,
}: DisplayDocProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScroled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


    function handleScroll() {
     window.scrollTo({behavior: 'smooth', top: 0})
    }
  return (
    <div className="relative">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#ff561b] font-medium transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all docs
          </button>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-orange-100 text-[#ff561b]">
              {getTypeLabel(selectedDoc.type)}
            </span>
            
            <button
              onClick={() => handleExportMarkdown(selectedDoc)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium cursor-pointer"
              disabled={isGenerating}
            >
              <FileDown className="w-4 h-4" />
              Export .md
            </button>
            
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-1" ref={printRef}>
            <Suspense fallback={<div>Loading...</div>}>
            <RenderDocument documentetaion={selectedDoc.body} />
            </Suspense>
          </div>
        </div>
      </div>

      {isScroled && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={handleScroll}
            className="bg-white hover:bg-gray-100 cursor-pointer text-gray-700 px-3 py-3 rounded-full shadow-lg border border-gray-200 transition-all duration-200 ease-in-out hover:shadow-xl flex items-center gap-2 font-medium text-sm"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
   
          </button>
        </div>
      )}
    </div>
  );
};


export default DisplayDoc;