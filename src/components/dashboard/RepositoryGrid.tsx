import { RepositoryCard } from './RepositoryCard'
import { AddRepositoryCard } from './AddRepositoryCard'
import RepositoryCardSkeleton from "./RepositoryCardSkeleton"
interface Repository {
  id: string
  repoisteryUrl: string | null
  zipFileName: string | null
  createdAt: Date
}

interface RepositoryGridProps {
  repos?: Repository[]
  isLoading: boolean
  onRepositoryClick: (id: string) => void
}

export function RepositoryGrid({ repos, isLoading, onRepositoryClick }: RepositoryGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-6">
        {[1 , 2 , 3 ].map((i) => (
          <RepositoryCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      <AddRepositoryCard />
      {repos?.map((repo) => (
        <RepositoryCard
          key={repo.id}
          repo={repo}
          onClick={onRepositoryClick}
        />
      ))}
    </div>
  )
}