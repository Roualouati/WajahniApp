import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "../components/admin-components/admin-sidebar";
import { Toaster } from "sonner";

type Props = {
    children: React.ReactNode;
    };
const layout =({children}:Props)=>{
return(


<div className="flex-1 overflow-auto p-4">
    <SidebarProvider style={{
    "--sidebar-width": "20rem",
    "--sidebar-width-mobile": "20rem",
  } as React.CSSProperties}><AdminSidebar/> <SidebarTrigger />{children}</SidebarProvider>

<Toaster position="top-center" />
</div>

)
}
export default layout;