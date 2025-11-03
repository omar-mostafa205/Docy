import getServerSession from "next-auth";
import { authConfig } from "@/server/auth/config";
import DashboardBody from "@/components/DashboardBody";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div>
      <DashboardBody userId={session.user?.id ?? ""} />
    </div>
  );
};

export default DashboardPage;
