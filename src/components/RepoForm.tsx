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

const fromSchema = z.object({
  repoUrl: z.string().url(),
  repoToken: z.string(),
  docType: z.enum(['technical', 'api', 'both'])
})

const RepoForm = () => {
  const createRepo = api.project.createRepo.useMutation() 
  const [generating, setGenerating] = React.useState(false)
  const router = useRouter()
  const [selectedDocType, setSelectedDocType] = React.useState<'technical' | 'api' | 'both' | null>(null)
  
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
      onError: () => {
        setGenerating(false)
        toast.error("Failed to create project")
      }  
    })
  }
  
  const docTypes = [
    {
      value: 'technical',
      title: 'Technical Documentation (Architecture & Code Overview)',
      description:
        'A detailed explanation of the system’s architecture, folder structure, technologies used, and logic behind the implementation.',
      badge: 'Recommended for developers',
    },
    {
      value: 'api',
      title: 'API Documentation (Endpoints & Integration Guide)',
      description:
        'A complete list of API endpoints, request and response examples, authentication methods, and usage guidelines',
      badge: 'Recommended for backend teams',
    },
    {
      value: 'both',
      title: 'Full Documentation Package (Technical + API)',
      description:
        'A combined package that includes both the technical overview and the API reference. Gives a complete picture of how the system is structured and how it can be integrated.',
      badge: 'Complete package',
    },
  ];
  

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
                  className="h-10 border-gray-200 focus:border-[#6f64fa] focus:ring-[#6f64fa]/20"
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
                  className="h-10 border-gray-200 focus:border-[#6f64fa] focus:ring-[#6f64fa]/20"
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
                  {docTypes.map((docType) => (
                    <label
                      key={docType.value}
                      className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        field.value === docType.value
                          ? 'border-[#ff551a] bg-[#fff5f4]'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                      onClick={() => {
                        field.onChange(docType.value)
                        setSelectedDocType(docType.value as any)
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              field.value === docType.value
                                ? 'border-[#ff551a]'
                                : 'border-gray-300'
                            }`}
                          >
                            {field.value === docType.value && (
                              <div className="w-2 h-2 rounded-full bg-[#e1754d]" />
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5 gap-2">
                            <h3 className="text-gray-900 font-semibold text-sm">
                              {docType.title}
                            </h3>
                            {docType.badge && (
                              <span className="text-[#ff551a] font-medium text-xs whitespace-nowrap">
                                {docType.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-xs leading-relaxed">
                            {docType.description}
                          </p>
                        </div>
                      </div>
                    </label>
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
/> 
</div>
      </form>
    </Form>
  )
}

export default RepoForm