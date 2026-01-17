// hooks/useDocs.ts
import { api } from '@/trpc/react'

interface UseDocsParams {
  repoId: string
}

export interface Doc {
  id: string
  title?: string
  description?: string
  body: string | object
  type: DocType
  createdAt: string
  updatedAt: string
}

type DocType = 'API' | 'TECHNICAL' | 'BOTH'

export function useDocs({ repoId }: UseDocsParams) {
  const query = api.project.getRepoWithDocs.useQuery(
    { id: repoId },
    {
      enabled: !!repoId,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: 2,
    }
  )

  return {
    docs: query.data?.docs ?? [],
    repo: query.data?.repo,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isRefetching: query.isRefetching
  }
}