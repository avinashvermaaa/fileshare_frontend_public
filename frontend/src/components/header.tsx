"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogIn, UserPlus } from "lucide-react";

export default function Header() {
  return (
    <>
      {/* Mobile TopBar - Glass Dark (Same in all modes) */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-fileshare-dark/70 backdrop-blur-xl border-b border-gray-800 flex items-center justify-between px-4 md:hidden z-50">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <svg
            width="32"
            height="32"
            viewBox="0 0 40 24"
            className="fill-white transition-colors"
          >
            <path d="M16.41 8.53a1.009 1.009 0 00-1.383-.386c-.513.292-.693.956-.401 1.47l8.272 14.624a1.009 1.009 0 001.383.386c.513-.292.693-.956.401-1.47L16.41 8.53zm-5.263-.134a1.009 1.009 0 011.383.386l8.272 14.625c.292.513.112 1.177-.401 1.47a1.009 1.009 0 01-1.383-.387L10.746 9.866c-.292-.513-.112-1.177.401-1.47z"></path>
            <path d="M24.715 0a12.92 12.92 0 100 25.842 12.92 12.92 0 000-25.842zm0 2.013c6.02 0 10.906 4.886 10.906 10.907 0 6.021-4.886 10.907-10.906 10.907-6.022 0-10.907-4.886-10.907-10.907 0-6.021 4.885-10.907 10.907-10.907z"></path>
          </svg>
          <span className="font-bold text-lg tracking-tight text-white">
            FileShare
          </span>
        </Link>

        {/* Buttons */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:bg-white/10"
          >
            <LogIn size={20} />
          </Button>

          <Button
            size="icon"
            className="bg-white text-gray-900 hover:bg-gray-200"
          >
            <UserPlus size={20} />
          </Button>
        </div>
      </header>

      {/* Desktop Sidebar - Same Dark Glass */}
      <header
        className="
          fixed top-0 left-0 h-screen w-20 lg:w-24 z-50 
          bg-fileshare-dark/70 backdrop-blur-xl
          border-r border-gray-800
          hidden md:flex flex-col justify-between
        "
      >
        <div className="flex flex-col items-center justify-between h-full py-8 px-3">
          
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center justify-center mb-8 group"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 24"
              className="fill-white transition-transform group-hover:scale-105"
            >
              <path d="M16.41 8.53a1.009 1.009 0 00-1.383-.386c-.513.292-.693.956-.401 1.47l8.272 14.624a1.009 1.009 0 001.383.386c.513-.292.693-.956.401-1.47L16.41 8.53zm-5.263-.134a1.009 1.009 0 011.383.386l8.272 14.625c.292.513.112 1.177-.401 1.47a1.009 1.009 0 01-1.383-.387L10.746 9.866c-.292-.513-.112-1.177.401-1.47z"></path>
              <path d="M24.715 0a12.92 12.92 0 100 25.842 12.92 12.92 0 000-25.842zm0 2.013c6.02 0 10.906 4.886 10.906 10.907 0 6.021-4.886 10.907-10.906 10.907-6.022 0-10.907-4.886-10.907-10.907 0-6.021 4.885-10.907 10.907-10.907z"></path>
            </svg>
          </Link>

          {/* Controls */}
          <div className="flex flex-col items-center space-y-6 w-full">
            <ThemeToggle />

            <div className="flex flex-col space-y-3 w-full px-1">
              <Button
                variant="ghost"
                className="w-full justify-center text-gray-300 hover:bg-white/10"
              >
                <LogIn size={18} />
              </Button>

              <Button
                className="w-full justify-center bg-white text-gray-900 hover:bg-gray-200 shadow-md"
              >
                <UserPlus size={18} />
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}