/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
"use client";
import React, { useState, useEffect } from 'react';
import { ChevronsUpDown, Github, LogOut, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { api } from '@/trpc/react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";

interface Repository {
  id: string;
  name?: string;
  repoisteryUrl?: string;
  zipFileName?: string;
  githubUrl?: string;
  createdAt: Date;
}

export default function DashboardNav() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
    const pathSegments = pathname?.split('/').filter(Boolean);
  const isDocsPage = pathSegments?.[0] === 'dashboard' && pathSegments?.[1] === 'docs';
  const repoIdFromPath = isDocsPage ? pathSegments?.[2] : null;
  const repoId = searchParams.get('repoId') || repoIdFromPath;

  const [activeRepo, setActiveRepo] = useState<Repository | null>(null);

  const { data: repos } = api.project.getRepos.useQuery({
    userId: session?.user?.id || '',
  }, {
    enabled: !!session?.user?.id
  });

  const { data: currentRepo } = api.project.getReopId.useQuery(
    { id: repoId || '' },
    { enabled: !!repoId }
  );

  useEffect(() => {
    if (currentRepo) {
      setActiveRepo(currentRepo);
    }
  }, [currentRepo]);

  function handleRepoClick(repo: Repository) {
    setActiveRepo(repo);
    router.push(`/dashboard/docs/${repo.id}`);
  }

  function handleWorkspaceClick() {
    setActiveRepo(null);
    router.push('/dashboard');
  }

  async function handleSignOut() {
    await signOut({ callbackUrl: '/' });
  }

  return (
    <nav className="bg-white border-b border-[#e5e5e5] h-[56px] flex items-center justify-between px-4 z-50">
      <div className="flex items-center space-x-3">
        <div className="flex items-center gap-2 justify-center">
          <Link href="/">
          <Image src="/new.png" alt="Logo" width={32} height={32} />
          </Link>
        </div>

        <span className="text-gray-400">/</span>

        <button 
          onClick={handleWorkspaceClick}
          className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-2 py-1 transition-colors cursor-pointer"
        >
          <span className="text-[15px] font-medium text-gray-800 ">
            Personal Workspace
          </span>
        </button>

        {activeRepo && (
          <>
            <span className="text-gray-400">/</span>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-2 py-1 transition-colors">
                  <Github size={16} className="text-gray-600" />
                  <span className="text-[15px] font-medium text-gray-800">
                    {activeRepo.zipFileName || activeRepo.repoisteryUrl || 'Repository'}
                  </span>
                  <ChevronsUpDown size={16} className="text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-100 ml-60">
                <DropdownMenuLabel className="text-xs text-gray-800 uppercase">
                    {activeRepo.repoisteryUrl.replace('https://github.com/', '').split('/')[1]?.toLowerCase() }
                  </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {repos && repos.length > 0 ? (
                  repos.map((repo) => (
                    <DropdownMenuItem
                      key={repo.id}
                      onClick={() => handleRepoClick(repo)}
                      className="cursor-pointer flex items-center gap-2"
                    >
                      <Github size={16} className="text-gray-600" />
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          { repo.repoisteryUrl || 'Repository'}
                        </p>
                        {repo.githubUrl && (
                          <p className="text-xs text-gray-500 truncate">
                            {repo.githubUrl}
                          </p>
                        )}
                      </div>
                      {activeRepo.id === repo.id && (
                        <div className="w-2 h-2 rounded-full bg-[#ff7a1b]"></div>
                      )}
                    </DropdownMenuItem>
                  )).filter((repo) => repo.id !== activeRepo.id)
                ) : (
                  <DropdownMenuItem disabled>
                    <span className="text-sm text-gray-500">No repositories found</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild className='cursor-pointer'>
                  <Link href='/upload-repo'>
                  <Plus size={16} className="text-[#ff561b]" />
                  <span className="text-sm font-medium text-[#ff561b]">Create Documentaion</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>

      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-1 transition-colors">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium text-sm">
                  {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-gray-900">
                {session?.user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session?.user?.email || ''}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <LogOut size={16} className="mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}