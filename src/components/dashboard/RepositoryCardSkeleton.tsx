import React from 'react'

const RepositoryCardSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 min-h-[280px] animate-pulse bg-white">
      <div className="h-8 bg-gray-300 rounded mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  )
}

export default RepositoryCardSkeleton