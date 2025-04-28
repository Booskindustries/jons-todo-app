import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/SideBar"

/**
 * 
 * @param param0 - The children prop represents the content to be rendered within the layout.
 * @component Layout
 * @description A layout component that wraps the application with a sidebar and a main content area.
 * It provides a consistent structure for the application, including a sidebar and a main content area.
 * 
 * @returns {JSX.Element} - A React component that represents the layout of the application.
 */
const Layout = ( { children }: {children:React.ReactNode}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      
      <main className="flex h-screen w-full flex-col overflow-auto bg-background text-foreground">
      
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;