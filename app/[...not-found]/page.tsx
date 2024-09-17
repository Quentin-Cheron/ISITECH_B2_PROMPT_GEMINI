import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          404
        </h1>
        <p className="text-white text-lg">Page not found</p>
        <Button variant="link" className="text-white text-lg" asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
    </main>
  );
}
