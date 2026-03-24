import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { links } from '../lib/constants';
import Socials from './Socials';

export default function FooterSection() {
    return (
        <section id = "footer">
        <footer className="py-16 md:py-32 min-h-[70vh] bg-[#261a17] relative overflow-hidden flex items-center flex-col">
            <div className="mx-auto max-w-5xl px-6 relative">
                <Link href="/">
                <Image src="/new.png" alt="Logo" width={32} height={32} className="absolute top-0 left-1/2 -translate-x-1/2  -translate-y-10 " />
                    </Link>
                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className="text-white hover:text-orange-500 block duration-150">
                            <span>{link.title}</span>
                        </a>
                    ))}
                </div>
                    <Socials />
                <span className="text-white block text-center text-sm mb-8"> © {new Date().getFullYear()} Docy, All rights reserved</span>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full overflow-hidden pointer-events-none">
  <span
    className="
      block
      text-center
      font-bold
      tracking-tight
      leading-none
      text-[#fa5028]
      opacity-[0.1]

      text-[96px]          /* mobile */
      sm:text-[170px]      /* small screens */
      md:text-[200px]      /* tablets */
      lg:text-[280px]      /* desktop */

      -mb-3
      md:-mb-6
      lg:-mb-8
    "
  >
    Docy
  </span>
</div>
        </footer>
        </section>
    )
}