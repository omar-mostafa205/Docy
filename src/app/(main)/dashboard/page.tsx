import getServerSession from "next-auth";
import { authConfig } from "@/server/auth/config";
import DashboardBody from "@/components/DashboardBody";
import { redirect } from "next/navigation";
import React from "react";
import{ Suspense } from "react";


const DashboardPage = async () => {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div>
      <Suspense>
      <DashboardBody userId={session.user?.id ?? ""} />
        </Suspense>
    </div>
  );
};

export default DashboardPage;
