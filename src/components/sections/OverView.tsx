"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Overview() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingLine1Ref = useRef(null);
  const headingLine2Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none none',
      }
    });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo(
      headingLine1Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    )
    .fromTo(
      headingLine2Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.5'
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#261a17] flex items-center justify-center p-4 sm:p-10">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-block mb-4" ref={badgeRef}>
            <span className="text-sm font-medium text-[#ff4d1a] border border-[#ff4d1a] rounded-full px-4 py-1 shadow-sm">
              OVERVIEW 
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
            <span ref={headingLine1Ref} className="text-white block mb-2">Generate full documentation </span>
            <span ref={headingLine2Ref} className="text-[#ff4d1a] block">powered by AI.</span>
          </h1>
        </div>

        <div className="bg-[#2f2320] backdrop-blur-sm rounded-3xl p-4 sm:p-10 border border-white/10">
          <div className="relative w-full pb-[56.25%] min-h-[250px] sm:min-h-0 bg-[#2f2320] rounded-xl overflow-hidden shadow-2xl">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="final.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}