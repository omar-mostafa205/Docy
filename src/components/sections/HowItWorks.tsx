"use client"

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DocyModelSelectorCard } from '../DocyModelSelectorCard'
import { DocyExplainCard } from '../DocyExplainCard'

gsap.registerPlugin(ScrollTrigger)

// Placeholder components


const HowItWorks = () => {
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    // Check screen size
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768) // md breakpoint
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  useEffect(() => {
    // Only apply animations on medium and large screens
    if (!isLargeScreen) return

    const cards = [card1Ref.current, card2Ref.current]
    
    cards.forEach((card, index) => {
      const nextCard = cards[index + 1]
      
      ScrollTrigger.create({
        trigger: card,
        start: 'top top',
        end: nextCard ? 'bottom top' : '+=0',
        pin: true,
        pinSpacing: false,
        scrub: true,
      })

      if (nextCard) {
        gsap.fromTo(
          card,
          { scale: 1, opacity: 1 },
          {
            scale: 0.9,
            opacity: 0.8,
            scrollTrigger: {
              trigger: nextCard,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [isLargeScreen])

  return (
    <div className='mb-15'>
      <div className="text-center mb-4">
        <span className="text-sm font-medium text-[#ff4d1a] border border-[#ff4d1a] rounded-full px-4 py-1 shadow-sm ">
          HOW IT WORKS 
        </span>
      </div>
      
      <div ref={card1Ref} className={`${isLargeScreen ? 'h-screen' : 'min-h-screen'} flex items-center justify-center px-4 ${isLargeScreen ? '' : 'mb-8'}`}>
        <DocyExplainCard />
      </div>

      <div ref={card2Ref} className={`${isLargeScreen ? 'h-screen' : 'min-h-screen'} flex items-center justify-center px-4`}>
        <DocyModelSelectorCard />
      </div>
    </div>
  )
}

export default HowItWorks