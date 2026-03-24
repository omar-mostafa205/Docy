"use client";

import React from "react";
import { usePathname } from "next/navigation";
import LimitReachedPage from "@/app/limit-reached/page";

export default function AILimitOverlay({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLimitReached = process.env.NEXT_PUBLIC_AI_LIMIT_REACHED === "true";
  
  // Don't show overlay on community or limit-reached pages
  const isRestrictedPath = pathname === "/limit-reached" || pathname === "/community";

  if (isLimitReached && !isRestrictedPath) {
    return (
      <div className="relative">
        {/* We still render the children but with an overlay or just replace it */}
        <div className="fixed inset-0 z-[9999] bg-white">
           <LimitReachedPage />
        </div>
        <div className="opacity-0 pointer-events-none">
          {children}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
