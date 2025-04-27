import React from "react";
import { Button } from "@/components/ui/button";
import ThemeSelector from "@/components/ThemeSelector";


export function Settings() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="mt-4">This is the settings page.</p>

            <ThemeSelector />

            <div className="mt-4 flex flex-col items-center space-y-2">
                <h2 className="text-2xl font-bold">Fonts</h2>
            </div>
            <div className="mt-4 flex flex-col items-center space-y-2">
                <h2 className="text-2xl font-bold">Text size</h2>
            </div>
            <div className="mt-4 flex flex-col items-center space-y-2">
                <h2 className="text-2xl font-bold">Text size</h2>
            </div>
        </div>
    );
}