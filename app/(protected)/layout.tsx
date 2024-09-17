import { Loader2 } from "lucide-react";
import { Navbar } from "./_components/navbar";
import React, { Suspense } from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <>
      <main className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        <Navbar />
        <Suspense fallback={<Loader2 className="w-7 h-7 animate-spin" />}>
          {children}
        </Suspense>
      </main>
    </>
  );
}
