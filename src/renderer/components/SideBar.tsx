import { Calendar, Home, Inbox, Search, Settings, Plus, PlusCircleIcon } from "lucide-react"
import React from "react"
import { NavUser } from "./nav-user"
import { QuickTask } from "./QuickTask"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const data = {
    user: {
        name: "Jon Barrett",
        email: "jbarrett@pm.me",
        avatar: "/avatars/pfp.jpg",
    },
    items: [
        {
            title: "Home",
            url: "#",
            icon: Home,
        },
        {
            title: "Calendar",
            url: "#",
            icon: Calendar,
        },
        {
            title: "Search",
            url: "#",
            icon: Search,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings,
        },
    ],
};

export function AppSidebar() {
  return (
    
      
    
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
            <SidebarGroupContent>
            <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
            <QuickTask />
            </SidebarMenuItem>
          </SidebarMenu>
              <SidebarMenu>
                {data.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
  )
}
