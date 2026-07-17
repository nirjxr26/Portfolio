"use client";

import { MAILTO } from "@/lib/email";

export default function Footer() {
  return (
    <footer className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto py-8 border-t border-white/[0.04]">
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href={MAILTO} className="text-xs text-secondary/60 hover:text-foreground transition-colors font-sans">Email</a>
          <a href="tel:+918799142626" className="text-xs text-secondary/60 hover:text-foreground transition-colors font-sans">Phone</a>
          <a href="https://github.com/nirjxr26" target="_blank" rel="noreferrer" className="text-xs text-secondary/60 hover:text-foreground transition-colors font-sans">GitHub</a>
          <a href="https://linkedin.com/in/nirjxr" target="_blank" rel="noreferrer" className="text-xs text-secondary/60 hover:text-foreground transition-colors font-sans">LinkedIn</a>
          <a href="https://x.com/nirjxrgoswami" target="_blank" rel="noreferrer" className="text-xs text-secondary/60 hover:text-foreground transition-colors font-sans">Twitter</a>
          <a href="https://blog.nirjar.me/" target="_blank" rel="noreferrer" className="text-xs text-secondary/60 hover:text-foreground transition-colors font-sans">Blog</a>
          <a href="/nirjar_resume.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-white font-medium hover:text-white/80 transition-colors font-sans">Resume</a>
        </div>
        <div className="w-full max-w-xs h-px bg-white/[0.06]" />
        <p className="text-xs text-secondary/70 font-normal text-center font-sans">
          © {new Date().getFullYear()} Nirjar Goswami. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
