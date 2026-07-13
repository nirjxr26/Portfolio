"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as Icons from "@/components/Icons";
import { MAILTO } from "@/lib/email";

type NavbarProps = {
  variant: "home" | "project";
  title?: string;
};

export default function Navbar({ variant, title }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWorksDropdownOpen, setIsWorksDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<"up" | "down">("up");

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      setIsScrolled(currentScrollY > 50);
      if (Math.abs(delta) < 10) { lastScrollY.current = currentScrollY; return; }
      const goingDown = delta > 0;
      if (goingDown && currentScrollY > 50 && scrollDirection.current !== "down") {
        setShowHeader(false);
        scrollDirection.current = "down";
      } else if (!goingDown && scrollDirection.current !== "up") {
        setShowHeader(true);
        scrollDirection.current = "up";
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} ${isScrolled
          ? "py-3 bg-background/95 backdrop-blur-md"
          : "py-6 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-[4px]"
          }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
          {variant === "project" && title ? (
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-secondary font-mono">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <Icons.ChevronRight className="w-3 h-3 text-secondary/60" />
              <span className="text-foreground font-medium font-sans">{title}</span>
            </nav>
          ) : <div />}

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8 text-[13px] font-normal tracking-wide">
            <div
              className="relative py-2"
              onMouseEnter={() => setIsWorksDropdownOpen(true)}
              onMouseLeave={() => setIsWorksDropdownOpen(false)}
            >
              <span className="text-secondary hover:text-foreground transition-colors duration-300 block cursor-default">
                Works
              </span>
              {isWorksDropdownOpen && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 bg-[#17150E]/98 backdrop-blur-md border border-white/[0.08] rounded-[8px] p-1.5 shadow-2xl z-50 overflow-hidden"
                  style={{ opacity: isWorksDropdownOpen ? 1 : 0, transform: `translateY(${isWorksDropdownOpen ? 0 : 8}px)` }}
                >
                  <Link
                    href="/works/bastion"
                    className="px-3 py-2 text-foreground hover:bg-white/[0.04] block rounded-[6px] group/item"
                  >
                    <div className="font-sans font-medium text-[12px] tracking-wide text-foreground group-hover/item:text-accent transition-colors flex items-center gap-1">
                      Bastion <Icons.ArrowUpRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-all" />
                    </div>
                  </Link>
                  <Link
                    href="/works/kost"
                    className="px-3 py-2 text-foreground hover:bg-white/[0.04] block rounded-[6px] group/item"
                  >
                    <div className="font-sans font-medium text-[12px] tracking-wide text-foreground group-hover/item:text-accent transition-colors flex items-center gap-1">
                      Kost <Icons.ArrowUpRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-all" />
                    </div>
                  </Link>
                </div>
              )}
            </div>
            {variant === "home" && (
              <a href="#insights" onClick={(e) => handleScrollTo(e, "#insights")} className="text-secondary hover:text-foreground transition-colors duration-300">
                Articles
              </a>
            )}
            {variant === "home" ? (
              <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")} className="text-secondary hover:text-foreground transition-colors duration-300">
                Contact
              </a>
            ) : (
              <Link href="/#contact" className="text-secondary hover:text-foreground transition-colors duration-300">
                Contact
              </Link>
            )}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-secondary hover:text-foreground transition-colors cursor-pointer md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <Icons.X className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background pt-28 px-6 pb-12 flex flex-col justify-between md:hidden"
          style={{ opacity: mobileMenuOpen ? 1 : 0, transform: mobileMenuOpen ? "translateY(0)" : "translateY(-20px)" }}
        >
          {variant === "home" ? (
            <nav className="flex flex-col space-y-6 text-2xl font-light tracking-wide">
              <a href="#work" onClick={(e) => { setMobileMenuOpen(false); handleScrollTo(e, "#work"); }} className="text-foreground hover:text-secondary transition-colors">Works</a>
              <Link href="/works/bastion" onClick={() => setMobileMenuOpen(false)} className="text-sm text-secondary hover:text-foreground transition-colors ml-4 flex items-center gap-1.5">
                Bastion <Icons.ArrowUpRight className="w-3 h-3" />
              </Link>
              <Link href="/works/kost" onClick={() => setMobileMenuOpen(false)} className="text-sm text-secondary hover:text-foreground transition-colors ml-4 flex items-center gap-1.5">
                Kost <Icons.ArrowUpRight className="w-3 h-3" />
              </Link>
              <a href="#insights" onClick={(e) => { setMobileMenuOpen(false); handleScrollTo(e, "#insights"); }} className="text-foreground hover:text-secondary transition-colors">Articles</a>
              <a href="#contact" onClick={(e) => { setMobileMenuOpen(false); handleScrollTo(e, "#contact"); }} className="text-foreground hover:text-secondary transition-colors">Contact</a>
            </nav>
          ) : (
            <nav className="flex flex-col space-y-6 text-2xl font-light tracking-wide">
              <span className="text-foreground">Works</span>
              <Link href="/works/bastion" onClick={() => setMobileMenuOpen(false)} className="text-sm text-secondary hover:text-foreground transition-colors ml-4 flex items-center gap-1.5">
                Bastion <Icons.ArrowUpRight className="w-3 h-3" />
              </Link>
              <Link href="/works/kost" onClick={() => setMobileMenuOpen(false)} className="text-sm text-secondary hover:text-foreground transition-colors ml-4 flex items-center gap-1.5">
                Kost <Icons.ArrowUpRight className="w-3 h-3" />
              </Link>
              <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="text-foreground hover:text-secondary transition-colors">Contact</Link>
            </nav>
          )}

          <div className="border-t border-foreground/5 pt-8 flex flex-col space-y-8">
            {variant === "home" ? (
              <>
                <div className="flex flex-col space-y-3">
                  <a href={MAILTO} className="text-lg font-light text-foreground hover:text-foreground/80 transition-colors underline underline-offset-8 decoration-foreground/20 hover:decoration-foreground w-fit">
                    nirjargoswami2626@gmail.com
                  </a>
                  <a href="tel:+918799142626" className="text-base font-light text-foreground hover:text-foreground/80 transition-colors underline underline-offset-8 decoration-foreground/20 hover:decoration-foreground w-fit">
                    +91 87991 42626
                  </a>
                  <div className="text-xs text-secondary font-light">Ahmedabad, Gujarat, India</div>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-secondary pt-2">
                  <a href="https://github.com/nirjxr26" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
                  <a href="https://linkedin.com/in/nirjxr" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
                  <a href="https://x.com/nirjxrgoswami" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Twitter</a>
                  <a href="https://blog.nirjar.me/" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Blogs</a>
                  <a href="/nirjar_resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Resume</a>
                </div>
              </>
            ) : (
              <>
                <div className="text-xs text-secondary font-light">Ahmedabad, Gujarat, India</div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-secondary">
                  <a href="https://github.com/nirjxr26" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
                  <a href="https://linkedin.com/in/nirjxr" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
                  <a href="https://x.com/nirjxrgoswami" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Twitter</a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
