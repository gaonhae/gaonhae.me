import Link from "next/link";
import { Navigation } from "./Navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 lg:px-10 flex h-16 items-center justify-between max-w-[1200px]">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm"></span>
          </div>
          <span className="text-xl font-bold hidden sm:inline">Gaonhae</span>
        </Link>

        <div className="flex items-center gap-6 lg:gap-10">
          <Navigation />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="mailto:contact@gaonhae.me" className="hidden md:block">
              <Button
                size="sm"
                className="min-w-[120px] h-10 rounded-lg text-sm font-bold tracking-wide hover:brightness-110 transition-all"
              >
                Get in touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
