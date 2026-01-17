export function DocumentLoadingSkeleton() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div 
            key={i} 
            className="bg-white border border-gray-200 rounded-xl p-6 min-h-[280px] animate-pulse shadow-sm"
          >
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
    )
  }