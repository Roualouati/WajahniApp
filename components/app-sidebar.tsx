"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconHome2,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUser,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: {
    firstName: string;
    lastName: string;
    image: string;
    email: string;
  };
}) {
  const data = {
    user,
    documents: [
      {
        name: "Home",
        url: "/user",
        icon: IconHome2,
      },
      {
        name: "Profile",
        url: "/user/profile",
        icon: IconUser,
      },
      {
        name: "Tests",
        url: "/user/tests",
        icon: IconReport,
      },
      {
        name: "Recommendations",
        url: "#",
        icon: IconFileWord,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <img src="/logo.png" alt="Logo" className="w-[160px] h-16 group-data-[collapsible=icon]:hidden" />
            {/* Mini logo for collapsed state */}
            <img 
              src="/logo-mini.png" 
              alt="Logo" 
              className="hidden w-14 h-9 group-data-[collapsible=icon]:block" 
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>    
        <NavDocuments items={data.documents} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}