import RenderDocs from '@/components/RenderDocs'
import React from 'react'

const DocsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Documentation Center</h1>
          <RenderDocs /> 
      </div>
    </div>
  )
}

export default DocsPage