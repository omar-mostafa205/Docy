"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import MobileNav from "./MobileNav";
import { useSession } from "next-auth/react";

export default function NavBar() {
    const { data: session } = useSession()

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 30);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -50; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  
      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }
    closeMenu();
  };
  
  return (
    <nav className={`fixed top-5 -mt-2 mb-20 left-0 right-0 z-50 mx-auto w-fit transition-all duration-300 ease-in-out ${
      isScrolled 
        ? 'backdrop-blur-md bg-white/80 shadow-lg border border-white/20' 
        : 'bg-gray-100'
    } rounded-2xl`}>
      <div className="flex flex-row gap-10 items-center py-4 px-4">
        <Link href="/" className="flex flex-row gap-1 items-center">
          <Image src="/new.png" alt="Logo" width={32} height={32} />
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Docy</h1>
        </Link>

        <ul className="hidden lg:flex flex-row items-center gap-8">
          <li>
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 cursor-pointer"
            >
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('overview')}
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 cursor-pointer"
            >
              overview
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 cursor-pointer"
            >
              Features
            </button>
          </li>

          <li>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 cursor-pointer"
            >
              How It Works
            </button>
          </li>
   
        </ul>

{       !session?.user ?
        <div className="relative rounded-full hidden lg:block">
        <Link href="/sign-in" className="relative z-10 bg-black text-white rounded-full px-6 py-2 block">
          Get Started
        </Link>
      </div>
      :(       <div className="relative rounded-full hidden lg:block cursor-pointer">
        <Link href="/dashboard" className="relative z-10 bg-black cursor-pointer text-white rounded-full px-6 py-2  flex flex-row gap-2 justify-center items-center">
          Dashboard
          <ArrowUpRight className="w-5 h-5" />
        </Link>

      </div> )
}  

        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {isMenuOpen && (
          <MobileNav  scrollToSection ={scrollToSection} closeMenu ={closeMenu}/> 
      )}
    </nav>
  );
}