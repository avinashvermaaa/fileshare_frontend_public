"use client";

import { Suspense } from "react";
import Header from "@/components/header";
import FileDropZone from "@/components/FileDropZone";
import dynamic from "next/dynamic";
import { ShieldCheck, Clock, Heart, Lock } from "lucide-react";

const TermsDialog = dynamic(() => import("@/components/terms-dialog"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-fileshare-dark relative overflow-hidden transition-colors duration-500">
      <Header />

      {/* Main Content - Added md:pl-24 to account for sidebar */}
      <div className="container max-w-7xl mx-auto px-4 pt-24 md:pt-10 md:pl-24 pb-20 relative z-5">
        <div className="flex flex-col items-center justify-center min-h-[80vh] md:min-h-auto">

          {/* Hero Section */}
          <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3 text-3xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500 dark:from-red-500 dark:via-white dark:to-blue-500">
                Send files with Ease
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] sm:text-xs md:text-sm font-medium border border-blue-200 dark:border-blue-800">
                <Lock size={12} />
                End-to-End Encrypted
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              Share large files with anyone, no account needed.
              <span className="block sm:inline"> Free, quick and secure.</span>
            </p>
          </div>

          {/* Drop Zone Container */}
          <div className="w-full max-w-md mb-20 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-150">
            <Suspense fallback={
              <div className="w-full max-w-md h-[500px] bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 animate-pulse rounded-2xl shadow-xl"></div>
            }>
              <FileDropZone />
            </Suspense>
          </div>

          {/* Features / Footer Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">

            {/* Secure Encryption */}
            <div className="flex flex-col items-center gap-3 p-5 rounded-xl bg-green-500/20 dark:bg-green-900/20 hover:bg-green-900/30 dark:hover:bg-green-900/30 transition-colors">
              <div className="p-3 rounded-full bg-green-600/40 dark:bg-green-900/40 text-green-600 dark:text-green-400">
                <ShieldCheck size={24} />
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Secure Encryption</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">AES-256 bit encryption</p>
            </div>

            {/* Auto Deletion */}
            <div className="flex flex-col items-center gap-3 p-5 rounded-xl bg-orange-500/20 dark:bg-orange-900/20 hover:bg-orange-900/30 dark:hover:bg-orange-900/30 transition-colors">
              <div className="p-3 rounded-full bg-orange-600/40 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400">
                <Clock size={24} />
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Auto Deletion</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Files deleted after 7 days</p>
            </div>

            {/* Made with Love */}
            <div className="flex flex-col items-center gap-3 p-5 rounded-xl bg-pink-500/20 dark:bg-pink-900/20 hover:bg-pink-900/30 dark:hover:bg-pink-900/30 transition-colors">
              <div className="p-3 rounded-full bg-pink-600/40 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400">
                <Heart size={24} />
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Made with Love</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Proudly built in India</p>
            </div>

          </div>

          <div className="mt-12 text-center text-black dark:text-white text-xs">
            &copy; {new Date().getFullYear()} FileShare. All rights reserved.
          </div>
        </div>
      </div>

      <TermsDialog />
    </main>
  );
}