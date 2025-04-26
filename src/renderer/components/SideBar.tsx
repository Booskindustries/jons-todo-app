import { Calendar, Home, Search, Settings, NotebookPen } from "lucide-react"
import React from "react"
import { NavUser } from "./nav-user"
import { QuickTask } from "./QuickTask"
import { Link } from 'react-router-dom';

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

/**
 * Data structure for the sidebar items and user information.
 * @typedef {Object} SidebarData
 * 
 * @property {Object} user - User information.
 * @property {string} user.name - User's name.
 * @property {string} user.email - User's email.
 * @property {string} user.avatar - User's avatar image URL.
 * 
 * @property {Array} items - List of sidebar items.
 *  @property {string} items[].title - Title of the sidebar item.
 *  @property {string} items[].url - URL of the sidebar item.
 *  @property {React.Component} items[].icon - Icon component for the sidebar item.
 *  
 */
const data = {
    user: {
        name: "Jon Barrett",
        email: "jbarrett@pm.me",
        avatar: "avatars/pfp.jpg",
    },
    items: [
        {
            title: "Home",
            url: "/",
            icon: Home,
        },
        {
            title: "Notes",
            url: "/notes",
            icon: NotebookPen,
        },
        {
            title: "Calendar",
            url: "/calendar",
            icon: Calendar,
        },
        {
            title: "Search",
            url: "#",
            icon: Search,
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings,
        },
    ],
};



/**
 * AppSidebar component represents the sidebar of the application.
 * It contains a list of menu items and a user profile section.
 * The sidebar is collapsible and can be toggled by the user.
 * 
 * @component AppSidebar
 * @returns {JSX.Element} - A React component that represents the application sidebar.
 */
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
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
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
