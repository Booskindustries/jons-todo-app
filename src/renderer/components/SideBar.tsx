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
    SidebarHeader,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import ProtectedRoute from "./ProtectedRoute";

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
    items: [
        {
            title: "All Tasks",
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
    <ProtectedRoute>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarHeader>
          <SidebarMenu>
              <SidebarMenuItem>
                <QuickTask />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarGroup>
            <SidebarGroupLabel>Pages</SidebarGroupLabel>
            <SidebarGroupContent>
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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarTrigger />
          </SidebarMenuItem>
        </SidebarMenu>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      </ProtectedRoute>
  )
}
