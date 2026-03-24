"use client";

import React from "react";
import Link from "next/link";
import { MoveRight, AlertCircle, Users } from "lucide-react";

export default function LimitReachedPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-2xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex justify-center">
          <div className="p-4 bg-orange-50 rounded-full border-2 border-orange-100 animate-bounce">
            <AlertCircle className="w-12 h-12 text-[#fa5028]" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            AI Credits <span className="text-[#fa5028]">Limit Reached</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
            Our AI engine has temporarily paused as we've reached our global credit limit. 
            Don't worry, you can still explore all the amazing documentations created by our community!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link
            href="/community"
            className="group flex items-center gap-2 px-8 py-4 bg-[#fa5028] text-white rounded-full font-semibold transition-all hover:bg-[#e04520] hover:scale-105 active:scale-95 shadow-lg hover:shadow-[#fa5028]/25"
          >
            <Users className="w-5 h-5" />
            Explore Community Docs
            <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="/"
            className="px-8 py-4 bg-white text-gray-600 border-2 border-gray-100 rounded-full font-semibold transition-all hover:bg-gray-50 hover:border-gray-200"
          >
            Back to Home
          </Link>
        </div>

        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 bg-gray-50 rounded-2xl space-y-2 border border-gray-100">
            <h3 className="font-bold text-gray-900">Why this happened?</h3>
            <p className="text-sm text-gray-500">We provide free AI generation to everyone, and we've reached our current capacity for today.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl space-y-2 border border-gray-100">
            <h3 className="font-bold text-gray-900">What can I do?</h3>
            <p className="text-sm text-gray-500">You can still view, share, and export any existing documentations in the community gallery.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl space-y-2 border border-gray-100">
            <h3 className="font-bold text-gray-900">When will it return?</h3>
            <p className="text-sm text-gray-500">Credits reset periodically. Check back soon to generate new technical documentation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
