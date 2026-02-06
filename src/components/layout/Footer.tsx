import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-foreground text-background py-16 flex justify-center">
      <div className="max-w-[1200px] w-full px-6 flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Left Section */}
        <div className="flex flex-col gap-6 max-w-[400px]">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">G</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">gaonhae.me</h2>
          </div>
          <p className="text-background/70 text-base leading-relaxed">
            성장의 여정을 기록하고 공유하는 공간입니다.
            개발 프로젝트부터 일상의 습관까지, 의미 있는 것들을 함께 만들어갑니다.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:contact@gaonhae.me"
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold">Start a conversation</h3>
          <div className="flex flex-col gap-4">
            <p className="text-background/70">contact@gaonhae.me</p>
            <Link href="mailto:contact@gaonhae.me">
              <Button
                className="bg-primary hover:brightness-110 text-white font-bold py-3 px-8 rounded-lg transition-all w-fit"
              >
                Send a Message
              </Button>
            </Link>
          </div>
          <p className="text-background/50 text-sm mt-8">
            © {currentYear} gaonhae.me. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
