import RenderDocs from '@/components/RenderDocs'
import React, { Suspense } from 'react'

export const dynamic = 'force-dynamic';

const DocsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Documentation Center</h1>
        <Suspense fallback={<div>Loading documentation...</div>}>
          <RenderDocs /> 
        </Suspense>
      </div>
    </div>
  )
}

export default DocsPage