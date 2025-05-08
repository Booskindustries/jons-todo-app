import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsLoggedIn } from "@/context/AccountContext";

import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"


export default function LoginPage() {
    const isLoggedIn = useIsLoggedIn(); // Check if the user is logged in
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isLoggedIn) {
        navigate("/"); // Redirect to the home page if already logged in
      }
    }, [isLoggedIn, navigate]); 

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground  hover:transition  hover:delay-300 hover:animate-bounce">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <LoginForm />
      </div>
    </div>
  )
}