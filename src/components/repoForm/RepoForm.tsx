"use client"
import { useSession } from 'next-auth/react'
import { Form } from "@/components/ui/form"
import GenerateButton from '../GenerateButton'
import { useRepoForm } from '@/hooks/useRepoForm'
import { RepoUrlField } from './RepoUrlField'
import { RepoTokenField } from './RepoTokenField'
import { DocTypeField } from './DocTypeField'

const RepoForm = () => {
  const { data: session } = useSession() 
  const { form, generating, onSubmit } = useRepoForm()

  if (!session) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-col gap-4 w-full max-w-3xl"
      >
        <RepoUrlField control={form.control} disabled={generating} />
        <RepoTokenField control={form.control} disabled={generating} />
        <DocTypeField control={form.control} disabled={generating} />

        <div className="mt-4">
          <GenerateButton 
            type="submit"
            generating={generating}
            disabled={generating}
            onClick={() => {}}
          />
        </div>
      </form>
    </Form>
  )
}

export default RepoForm