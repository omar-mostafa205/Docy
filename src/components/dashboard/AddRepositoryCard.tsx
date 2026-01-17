import Link from 'next/link'
import { Plus } from 'lucide-react'

export function AddRepositoryCard() {
  return (
    <Link 
      href="/upload-repo" 
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:border-gray-400 transition-colors min-h-[280px] bg-gray-50"
    >
      <Plus className="w-6 h-6 mb-2 text-gray-600" />
      <span className="text-gray-600 font-medium">Add Repository</span>
    </Link>
  )
}