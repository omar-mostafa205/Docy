import  getServerSession  from "next-auth";
import { authConfig } from "@/server/auth/config";
import DashboardNav from "@/components/dashboard/DashboardNav"
import { redirect } from "next/navigation";

export default async function dashboardLayout ({ children }: { children: React.ReactNode }){
    const session = await getServerSession(authConfig);
    if(!session) redirect('/sign-in')
    return(
        <div>
            <DashboardNav /> 
            {children}
        </div>
    )

}