"use client"
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { navItems } from "../lib/constants";
interface MobileNavProps {
  scrollToSection: (sectionId: string) => void;
  closeMenu: () => void;
}

export default function MobileNav({ scrollToSection, closeMenu }: MobileNavProps) {
  const { data: session } = useSession();

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    closeMenu();
  };

  return (
    <div className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 backdrop-blur-md bg-white/95 shadow-lg border border-white/20 rounded-2xl overflow-hidden">
      <ul className="flex flex-col py-4">
        {navItems.map((item) => (
          <li key={item.id}>
            <button 
              onClick={() => handleNavClick(item.id)}
              className="w-full text-left px-6 py-3 text-gray-700 hover:text-orange-600 hover:bg-gray-50 font-medium transition-all duration-200"
            >
              {item.label}
            </button>
          </li>
        ))}
        
        <li className="my-2 mx-6 border-t border-gray-200"></li>
        
        <li className="px-6 py-2">
          {!session?.user ? (
            <Link 
              href="/sign-in" 
              onClick={closeMenu}
              className="block w-full text-center bg-black text-white rounded-full px-6 py-3 font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Get Started
            </Link>
          ) : (
            <Link 
              href="/dashboard" 
              onClick={closeMenu}
              className="flex flex-row gap-2 justify-center items-center w-full text-center bg-black text-white rounded-full px-6 py-3 font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Dashboard
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}