import Link from 'next/link';
import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { SiGitlab } from 'react-icons/si';

const SignInPage = () => {
  const handleGitHubSignIn = async () => {
    "use server";
    const { signIn } = await import('@/server/auth');
    await signIn("github" , { callbackUrl: '/dashboard' });
  };

  const handleGitLabSignIn = async () => {
    "use server";
    const { signIn } = await import('@/server/auth');
    await signIn("gitlab" , { callbackUrl: '/dashboard' });
  };

  const handleGoogleSignIn = async () => {
    "use server";
    const { signIn } = await import('@/server/auth');
    await signIn("google" ,{ callbackUrl: '/dashboard' });
  };

  return (
    <div className='min-h-screen bg-[#f2f1ed] flex relative mx-auto'>
      <Link href='/' className='absolute left-22 gap-2 my-16'>
        <h2 className='text-2xl font-bold'>Docy</h2>
      </Link>
      
      <div className='w-1/2  items-center justify-center hidden sm:flex '>
        <div className='max-w-xl'>
          <h1 className='text-4xl font-bold mb-8 leading-tight md:text-5xl mx-10 md:mx-5'>
            Write Docs<br/> Without Writing Them.
          </h1>
          
          <p className='text-sm text-gray-600 md:text-xl mx-10 md:mx-5'>
            Upload your code and get AI-generated, structured documentation in seconds.
            Empower your team to focus on building — not explaining.
          </p>
        </div>
      </div>

      <div className='w-full sm:w-1/2  flex flex-col items-center justify-center bg-[#f7f8f3] min-h-screen p-8 relative shadow-2xl '>
        <div className='w-full max-w-md'>
          <h1 className='text-5xl font-bold text-black mb-6 text-center'>
            Welcome Back
          </h1>
          
          <p className='text-center text-gray-600 mb-8'>
            Login using one of the following providers:
          </p>

          <div className='flex flex-col gap-4 mb-8'>

          <form className='w-full' action={handleGoogleSignIn}>
              <button type='submit' className='w-full flex items-center justify-center gap-3 bg-white border border-orange-400 rounded-full py-4 px-8 hover:bg-orange-50 transition-colors text-lg font-medium shadow-sm cursor-pointer'>
                <FaGoogle size={24} />
                Google
              </button>
            </form>

            <form className='w-full' action={handleGitHubSignIn}>
              <button type='submit' className='w-full flex items-center justify-center gap-3 bg-white border border-orange-400 rounded-full py-4 px-8 hover:bg-orange-50 transition-colors text-lg font-medium shadow-sm cursor-pointer'>
                <FaGithub size={24} />
                GitHub
              </button>
            </form>

            <form className='w-full' action={handleGitLabSignIn}>
              <button type='submit' className='w-full flex items-center justify-center gap-3 bg-white border border-orange-400 rounded-full py-4 px-8 hover:bg-orange-50 transition-colors text-lg font-medium shadow-sm cursor-pointer'>
                <SiGitlab size={24} />
                GitLab
              </button>
            </form>

          </div>

          <div className='text-center space-y-2 mb-8'>
            <p className='text-gray-600'>
              New to Docy? <Link href="/sign-up" className='text-orange-500 cursor-pointer hover:underline'>Sign Up</Link>
            </p>
          </div>
        </div>

        <footer className='absolute bottom-8 text-center text-sm text-gray-500 px-8'>
          By continuing, you agree to the <span className='text-orange-500 cursor-pointer hover:underline'>Terms of Use</span> and <span className='text-orange-500 cursor-pointer hover:underline'>Privacy Policy</span> applicable to Docy
        </footer>
      </div>
    </div>
  );
};

export default SignInPage;