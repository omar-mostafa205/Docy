import { formatTimeAgo } from '@/lib/utils'

interface Repository {
  id: string
  repoisteryUrl: string | null
  zipFileName: string | null
  createdAt: Date
}

interface RepositoryCardProps {
  repo: Repository
  onClick: (id: string) => void
}

export function RepositoryCard({ repo, onClick }: RepositoryCardProps) {
  const displayName = repo.zipFileName || repo.repoisteryUrl?.split('/').pop() || 'Project'
  const displayUrl = repo.repoisteryUrl || repo.zipFileName || 'Repository'

  return (
    <button
      onClick={() => onClick(repo.id)}
      className="border border-gray-200 rounded-lg p-6 hover:border-[#fa5028] transition-colors cursor-pointer min-h-[280px] flex flex-col bg-white text-left"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-xs text-gray-500 truncate">
          {displayUrl}
        </span>
      </div>

      <div className="flex-1">
        <div className="text-xs text-white mb-1 bg-[#fa5028] py-1 px-2 rounded-xl w-fit">
          Free Plan
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {displayName}
        </h3>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Active</span>
      </div>

      <div className="text-xs text-gray-400 mt-2">
        Created {formatTimeAgo(repo.createdAt)}
      </div>
    </button>
  )
}