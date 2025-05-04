"use client"

import {
  
  IconDotsVertical,
  IconLogout,
  
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { BACKEND_URL } from "@/lib/constants"

export function NavUser({
  user,
}: {
  user: {
    firstName: string;
    lastName: string;
    image: string;
    email: string;
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <SidebarMenuButton
  size="lg"
  className="h-auto w-auto p-0 flex items-center justify-center gap-3 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
>
  <Avatar className="w-10 h-10 rounded-full border-0 overflow-hidden">
    <AvatarImage
      src={
        user.image
          ? `${BACKEND_URL}/${user.image}`
          : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`
      }
      alt="User Avatar"
      className="rounded-full w-full h-full object-cover"
    />
    <AvatarFallback className="w-full h-full flex items-center justify-center text-sm font-medium leading-none bg-muted">
      {user.firstName.charAt(0)}
      {user.lastName.charAt(0)}
    </AvatarFallback>
  </Avatar>

  {/* Only show text when expanded */}
  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
    <span className="truncate font-medium">
      {user.firstName} {user.lastName}
    </span>
    <span className="text-muted-foreground truncate text-xs">
      {user.email}
    </span>
  </div>

  <IconDotsVertical className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
</SidebarMenuButton>

          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-md"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal rounded-none">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="w-10 h-10 rounded-full border-0 overflow-hidden">
                  <AvatarImage
                    src={
                      user.image 
                        ? `${BACKEND_URL}/${user.image}`
                        : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`
                    }
                    alt="User Avatar"
                    className="rounded-full w-full h-full object-cover"
                  />
<AvatarFallback className="w-full h-full flex items-center justify-center text-sm font-medium leading-none bg-muted">
  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
</AvatarFallback>

                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.firstName} {user.lastName}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
          
            <DropdownMenuItem asChild>
  <a href="/api/auth/signout" className="flex items-center gap-2 w-full">
    <IconLogout className="size-4" />
    Log out
  </a>
</DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}