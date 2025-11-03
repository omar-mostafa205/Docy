import React from 'react';

export default function Overview() {
  return (
    <div className="min-h-screen bg-[#261a17] flex items-center justify-center p-10">
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-medium text-[#ff4d1a] border border-[#ff4d1a] rounded-full px-4 py-1 shadow-sm">
              OVERVIEW 
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="text-white block mb-2">Generate full documentation </span>
            <span className="text-[#ff4d1a]">powered by AST & AI.</span>
          </h1>
        </div>

        <div className="bg-[#2f2320] backdrop-blur-sm rounded-3xl p-10 border border-white/10">
          <div className="relative w-full pb-[56.25%] bg-[#2f2320] rounded-xl overflow-hidden shadow-2xl">
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