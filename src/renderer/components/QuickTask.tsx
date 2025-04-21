import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { PlusCircleIcon } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar"




export function QuickTask(){
 return(
    <Dialog>
        <DialogTrigger asChild>
            <SidebarMenuButton
                onClick={() => console.log("Quick Create Task")}
                tooltip="Quick Create Task"
                className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
                <PlusCircleIcon />
                <span>Quick Create Task</span>
            </SidebarMenuButton>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
        </DialogDescription>
        </DialogHeader>
        </DialogContent>
    </Dialog>
    )
}