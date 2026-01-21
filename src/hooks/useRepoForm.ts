// RepoForm.hooks.ts
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from '@/trpc/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import z from 'zod'

const formSchema = z.object({
  repoUrl: z.string().url(),
  repoToken: z.string(),
  docType: z.enum(['technical', 'api', 'both'])
})

export type RepoFormValues = z.infer<typeof formSchema>

export const useRepoForm = () => {
  const createRepo = api.project.createRepo.useMutation()
  const [generating, setGenerating] = useState(false)
  const router = useRouter()

  const form = useForm<RepoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      repoUrl: '',
      repoToken: '',
      docType: 'both'
    }
  })

  const onSubmit = (values: RepoFormValues) => {
    setGenerating(true)
    createRepo.mutate({
      repoisteryUrl: values.repoUrl,
      repoToken: values.repoToken,
      type: values.docType
    }, {
      onSuccess: () => {
        setGenerating(false)
        toast.success("Project created successfully")
        router.push('/dashboard')
      },
      onError: (error) => {
        setGenerating(false)
        if (typeof error.message === 'string' && !error.message.toLocaleLowerCase().includes('invalid access token')) {
          router.push('/dashboard')
        }
        else {
          toast.error(error.message)
        }
      }
    })
  }

  return {
    form,
    generating,
    onSubmit
  }
}