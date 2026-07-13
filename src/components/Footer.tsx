"use client";

import * as Icons from "@/components/Icons";
import { MAILTO } from "@/lib/email";

export default function Footer() {
  return (
    <footer className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto py-6 border-t border-white/[0.04]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-xs text-secondary font-light md:text-left text-center">
          © {new Date().getFullYear()} Nirjar Goswami. All rights reserved.
        </p>
        <div className="flex items-center justify-center md:justify-end gap-3 flex-wrap">
          <div className="bg-[#17150E] rounded-full px-5 py-2.5 flex items-center gap-5">
            <a href={MAILTO} aria-label="Email" className="text-secondary/60 hover:text-foreground transition-colors">
              <Icons.Mail className="w-4 h-4" />
            </a>
            <a href="tel:+918799142626" aria-label="Phone" className="text-secondary/60 hover:text-foreground transition-colors">
              <Icons.Phone className="w-4 h-4" />
            </a>
            <span aria-label="Ahmedabad, Gujarat, India" className="text-secondary/60 cursor-pointer">
              <Icons.MapPin className="w-4 h-4" />
            </span>
            <span className="text-secondary/20 select-none">|</span>
            <a href="https://github.com/nirjxr26" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-secondary/60 hover:text-foreground transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://linkedin.com/in/nirjxr" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-secondary/60 hover:text-foreground transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://x.com/nirjxrgoswami" target="_blank" rel="noreferrer" aria-label="Twitter" className="text-secondary/60 hover:text-foreground transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://blog.nirjar.me/" target="_blank" rel="noreferrer" aria-label="Blog" className="text-secondary/60 hover:text-foreground transition-colors">
              <Icons.FileText className="w-4 h-4" />
            </a>
          </div>
          <a href="/nirjar_resume.pdf" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full px-4 py-2 text-xs text-[#0C0A05] font-medium hover:bg-white/90 transition-colors">
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
