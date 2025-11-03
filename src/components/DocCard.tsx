"use client"
import { Download, Eye, FileText } from 'lucide-react'
import React from 'react'
import { FaFileDownload } from 'react-icons/fa'
import { FaFileExport } from 'react-icons/fa';

type Doc = {
    id: string
    title?: string
    description?: string
    body: string | object
    type: string
    createdAt: string
    updatedAt: string   
}

interface DocCardProps {
    doc: Doc
    handleView: (id: string) => void
    getTypeLabel: (type: string) => string
    getDocTitle: (type: string) => string
    getDocDescription: (type: string) => string
    handleExportMarkdown: (doc: Doc) => void
    handleDownloadPDF: (doc: Doc) => void
}

const DocCard = ({
  doc,
  handleView, 
  getTypeLabel, 
  getDocTitle, 
  getDocDescription, 
  handleExportMarkdown, 
  handleDownloadPDF
}: DocCardProps) => {
  return (
    <div className="space-y-3">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-6">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {getDocTitle(doc.type)}
              </h3>
              <p className="text-gray-600 mb-4">
                {getDocDescription(doc.type)}
              </p>
              <p className="text-sm text-gray-500">
                Created At  {new Date(doc.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-2 text-gray-600 shrink-0">
              <FileText className="w-5 h-5" />
              <span className="font-semibold text-lg">
                {typeof doc.body === 'string' ? Math.ceil(doc.body.length / 3000) : 12}
              </span>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => handleView(doc.id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-1 bg-[#ff561b]  border-1  border-[#ff561b]  text-white rounded-xl hover:bg-orange-700 transition-colors font-semibold cursor-pointer"
            >
              <Eye className="w-5 h-5" />
              View Docs
            </button>
            
            
            <button
              onClick={() => handleExportMarkdown(doc)}
              data-tooltip="Export"
              className="relative w-[150px] h-[40px]  bg-white   border border-1 border-[#ff561b]  rounded-lg font-['Arial'] transition-all duration-300 hover:bg-[#ff561b] group cursor-pointer border-0 overflow-hidden"
            >
              <div className="absolute w-full h-full left-0 top-0 ">
                <span className="absolute w-full h-full left-0 top-0 flex items-center justify-center  rounded-lg border-[#ff561b] rounded-md   text-[#ff561b] transition-all duration-500 group-hover:-top-full">
                  <span className="flex items-center gap-2 font-semibold rounded-lg">
                    Export .md
                  </span>
                </span>

                <span className="absolute w-full h-full left-0 top-full flex items-center justify-center text-white transition-all duration-500 group-hover:top-0">
                  <FaFileExport className="w-6 h-6" />
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocCard