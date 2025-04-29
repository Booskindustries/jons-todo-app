import React from "react"
import { useTaskContext } from '../context/TaskContext';
import { useAccount } from '../context/AccountContext';
 
import {
  Printer,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
  Settings,
} from "lucide-react"

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
import { Link } from "react-router-dom";
import { AccountWidget } from "./AccountWidget";

//TODO: need to do more with account setting and being able to login and pfp customisation

/**
 * @param param0 - The user object containing user information.
 * @param {Object} param0.user - The user object.
 * @param {string} param0.user.name - The user's name.
 * @param {string} param0.user.email - The user's email.
 * @param {string} param0.user.avatar - The user's avatar image URL.
 * 
 * @component NavUser
 * @description A component that displays the user's avatar, name, and email in a dropdown menu.
 * It includes options for account settings, notifications, and logout.
 * 
 * @returns {JSX.Element} - A React component that represents the user's profile in the sidebar.
 */
export function NavUser() {
  const { isMobile } = useSidebar()
  const { tasks } = useTaskContext();
  const { logout } = useAccount();


  const handlePrint = () => {
    (window as any).ipcAPI.invoke('print-home', tasks);
  };
  
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <AccountWidget />
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <AccountWidget />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserCircleIcon />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem id="print" onClick={handlePrint}> 
                <Printer />
                Print
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/Settings">
                  <Settings />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
