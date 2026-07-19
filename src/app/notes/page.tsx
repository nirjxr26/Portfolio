import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAllNotes } from "@/lib/notes";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Engineering Notes",
  description:
    "Production-grade engineering deep-dives — architecture decisions, system tradeoffs, and post-mortems from real infrastructure.",
  openGraph: {
    title: "Engineering Notes — Nirjar Goswami",
    description:
      "Production-grade engineering deep-dives — architecture decisions, system tradeoffs, and post-mortems from real infrastructure.",
    url: "https://nirjar.me/notes",
  },
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  const notes = getAllNotes();
  if (notes[0]) redirect(`/notes/${notes[0].slug}`);

  return (
    <>
      <main className="min-h-screen bg-background">
        <nav className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6">
          <Link
            href="/"
            className="text-xs text-secondary hover:text-foreground transition-colors font-mono"
          >
            ← Home
          </Link>
        </nav>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-20">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Engineering Notes
          </h1>
          <p className="text-secondary text-sm sm:text-base mb-12 max-w-xl leading-relaxed">
            Production-grade engineering deep-dives — architecture decisions,
            system tradeoffs, and post-mortems from real infrastructure. Not a
            blog. Not marketing.
          </p>

          <div className="space-y-8">
            {notes.map((note) => (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}`}
                className="block group"
              >
                <article className="border-b border-white/[0.04] pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    {note.series && (
                      <span className="text-[11px] font-mono uppercase tracking-widest text-accent/70">
                        {note.series}
                        {note.part ? ` · Part ${note.part}` : ""}
                      </span>
                    )}
                    <time className="text-xs text-secondary/60 font-mono">
                      {note.date}
                    </time>
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors mb-2">
                    {note.title}
                  </h2>
                  <p className="text-sm text-secondary leading-relaxed mb-3">
                    {note.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-secondary/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
