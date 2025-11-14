/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"
import React from 'react'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { api } from '@/trpc/react'
import toast from 'react-hot-toast'
import GenerateButton from './GenerateButton'
import { useRouter } from 'next/navigation'
import { DOC_TYPES } from '@/lib/constants'
import { DocTypeRadio } from './dashboard/DocTypeRadio'



const fromSchema = z.object({
  repoUrl: z.string().url(),
  repoToken: z.string(),
  docType: z.enum(['technical', 'api', 'both'])
})

const RepoForm = ({userId } : {userId : string}) => {
  const createRepo = api.project.createRepo.useMutation() 
  const [generating, setGenerating] = React.useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      repoUrl: '',
      repoToken: '',
      docType: 'both'
    }
  })

  function onSubmit(values: z.infer<typeof fromSchema>) {
    setGenerating(true)
    createRepo.mutate({
      repoisteryUrl: values.repoUrl,
      repoToken: values.repoToken,
      type : values.docType
    }, {
      onSuccess: () => {
        setGenerating(false)
        toast.success("Project created successfully")
        router.push('/dashboard') 
      },
      onError: (error) => {
        setGenerating(false)
        toast.error(error.message)
      }  
    })
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-3xl ">
        <FormField
          control={form.control}
          name="repoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-600 text-sm font-medium'>
                Repository URL
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://github.com/username/repo" 
                  {...field} 
                  className="h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                  disabled={generating}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="repoToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-600 text-sm font-medium'>
                Access Token
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="ghp_1xxxxxxxxxxxxxxx" 
                  type="password"
                  {...field} 
                  className="h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                  disabled={generating}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="docType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-gray-900 text-sm font-semibold mb-2 block'>
                Documentation Type
              </FormLabel>
              <FormControl>
                <div className="flex flex-col gap-3">
                  {DOC_TYPES.map((docType) => (
                    <DocTypeRadio
                      key={docType.value}
                      docType={docType}
                      isSelected={field.value === docType.value}
                      onChange={field.onChange}
                      disabled={generating}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='mt-4 cursor-pointer'>
          <GenerateButton 
            type="submit"
            generating={generating}
            disabled={generating} 
            onClick={undefined}
          /> 
        </div>
      </form>
    </Form>
  )
}

export default RepoForm