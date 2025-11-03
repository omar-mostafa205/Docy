import getServerSession from "next-auth";
import { authConfig } from "@/server/auth/config";
import DashboardBody from "@/components/DashboardBody";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

export const dynamic = 'force-dynamic';

const DashboardPage = async () => {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardBody userId={session.user?.id ?? ""} />
      </Suspense>
    </div>
  );
};

const DashboardSkeleton = () => (
  <div className="min-h-screen bg-white p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8">Your Repositories</h1>
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-6 min-h-[280px] animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DashboardPage;