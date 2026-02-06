import Link from "next/link";
import { Navigation } from "./Navigation";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">gaonhae.me</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Navigation />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
