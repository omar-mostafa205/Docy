"use client"
import { useDashboardRepos } from '@/hooks/useDashboardRepos'
import { RepositoryGrid } from './RepositoryGrid'

export default function DashboardBody() {
  const { repos, isLoading, navigateToRepo } = useDashboardRepos()

  return (
    <div className="min-h-screen bg-[#faf9f5] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Your Repositories</h1>
        <RepositoryGrid 
          repos={repos}
          isLoading={isLoading}
          onRepositoryClick={navigateToRepo}
        />
      </div>
    </div>
  )
}