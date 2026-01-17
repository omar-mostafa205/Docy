// hooks/useDashboardRepos.ts
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { api } from '@/trpc/react'

export function useDashboardRepos() {
  const router = useRouter()
  const { data: session } = useSession()
  
  const { data: repos, isLoading } = api.project.getRepos.useQuery({ 
    userId: session?.user?.id || ''   
  })

  const navigateToRepo = (repoId: string) => {
    router.push(`/dashboard/docs/${repoId}`)
  }

  return {
    repos,
    isLoading,
    navigateToRepo
  }
}