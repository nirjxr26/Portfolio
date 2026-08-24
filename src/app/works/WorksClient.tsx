"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/Stagger";
import * as Icons from "@/components/Icons";
import { projects, PROJECT_CATEGORIES } from "@/lib/projects";

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://nirjar.me" },
    { "@type": "ListItem", position: 2, name: "Works", item: "https://nirjar.me/works" },
  ],
};

export default function WorksClient() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((p) => p.tags.includes(activeCategory)),
    [activeCategory]
  );

  return (
    <main className="w-full min-h-screen relative bg-background text-foreground selection:bg-foreground/10 selection:text-foreground">
      <Navbar variant="project" title="Works" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Page heading + filters */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto pt-32 md:pt-40 pb-4">
        <StaggerContainer delay={0.1} staggerStep={0.15}>
          <StaggerItem>
            <TextReveal
              as="h1"
              className="text-[28px] sm:text-[34px] md:text-[40px] lg:text-[48px] font-normal text-foreground tracking-tight leading-[1.05] font-sans mb-6"
              text={activeCategory === "All" ? "All Projects." : `${activeCategory}.`}
            />
          </StaggerItem>
        </StaggerContainer>
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap items-center gap-2">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-normal border transition-colors duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-white/[0.06] border-white/[0.15] text-foreground"
                    : "border-white/[0.08] text-secondary hover:border-white/[0.15] hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Project grid */}
      <section className="py-8 md:py-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-2xl mx-auto">

        <StaggerContainer delay={0.15} staggerStep={0.08}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map((proj) => (
              <StaggerItem key={proj.title}>
                <div className="h-full min-h-[240px] p-5 md:p-[22px] flex flex-col items-start rounded-[8px] bg-[var(--surface-card)] border border-white/[0.04]">
                  <div>
                    <h4 className="text-[18px] md:text-[22px] font-normal text-foreground mb-0 font-sans tracking-[-0.01em] flex items-center gap-2">
                      {proj.title}
                    </h4>
                    <span className="text-xs text-secondary capitalize tracking-[0.03em] mb-4 block font-medium">
                      {proj.category}
                    </span>
                    <p className="text-secondary text-[15px] sm:text-base leading-relaxed font-normal max-w-lg mb-6">
                      {proj.description}
                    </p>
                  </div>
                  <div className="flex items-end justify-between w-full pt-8 mt-auto">
                    <div className="flex items-center gap-2 max-[400px]:flex-col max-[400px]:items-start">
                      {proj.projectLink ? (
                        <Link
                          href={proj.projectLink}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors cursor-pointer w-fit"
                        >
                          Learn more <Icons.ArrowUpRight className="w-4 h-4 text-accent" />
                        </Link>
                      ) : (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-foreground transition-colors cursor-pointer w-fit"
                        >
                          Explore Case <Icons.ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <span className="text-xs text-secondary font-mono leading-none">{proj.year}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-20 bg-[var(--surface-card)] flex flex-col items-center">
        <ScrollReveal delay={0.15}>
          <div className="w-full max-w-xl mx-auto text-center px-4">
            <TextReveal
              as="h2"
              className="text-[28px] sm:text-[32px] md:text-[36px] font-normal text-foreground tracking-tight leading-[1.15] font-sans text-center mb-3"
              text="Something in mind?"
            />
            <p className="text-secondary text-[14px] sm:text-[15px] md:text-[16px] leading-normal max-w-md mx-auto mb-4 font-sans">
              The projects are open and ready for contributors — dig into the code or open an issue anytime.
            </p>
            <a
              href="https://github.com/nirjxr26"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
            >
              View on GitHub
            </a>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  );
}
