import RepoForm from '@/components/RepoForm'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from 'next/image'
import Link from 'next/link'

const Page = () => {
  return (
    <div className='min-h-screen bg-[#faf9f5]  flex justify-center items-center p-6 relative'>
      <Link href='/' className='top-5 absolute left-10  flex-row items-center justify-center lg:flex hidden'>
      <Image src='/new.png' alt='github-logo' width={32} height={32} />
      <h1 className='text-xl md:text-2xl font-semibold text-gray-900'>Docy</h1>
      </Link>
      <div className='w-full max-w-3xl'>
        <Card className='border-0 shadow-xl shadow-gray-200 backdrop-blur-sm flex justify-center mx-auto bg-white'>
              <CardHeader className='space-y-1 pb-6 border-b '>
                <div className='flex items-center justify-between'>
                <CardTitle className='text-xl font-semibold text-gray-900 flex items-center gap-2'>
                  Connect with Repository URL
                </CardTitle>
                <Link href='/' className='text-sm text-gray-600 flex items-center gap-2'>
        <Image src='/new.png' alt='github-logo' width={32} height={32} /> 
        </Link> 
                </div>
                <CardDescription className='text-sm text-gray-600'>
                  Provide your GitHub repository URL and access token to generate documentation
                </CardDescription>
              </CardHeader>
              <CardContent className='pt-6'>
                <RepoForm />
              </CardContent>
            </Card>

      </div>
    </div>
  )
}

export default Page


