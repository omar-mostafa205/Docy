// app/dashboard/docs/[repoId]/page.tsx
import RenderDocs from '@/components/dashboard/RenderDocs'
import React from 'react'

export const dynamic = 'force-dynamic';

const DocsPage = () => {
  return (
    <div className="min-h-screen bg-[#faf9f5] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Documentation Center</h1>
        <RenderDocs /> 
      </div>
    </div>
  )
}

export default DocsPage