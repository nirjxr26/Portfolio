import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { notes } from "../../../../.velite";
import { getNoteBySlug, getAllNotes } from "@/lib/notes";
import MDXContent from "@/components/mdx/MDXContent";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const legacyNoteSlugRedirects: Record<string, string> = {
  "Bastion documentation-part-undefined": "bastion-deep-dive-part-1",
  "bastion-documentation-part-undefined": "bastion-deep-dive-part-1",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSlug = legacyNoteSlugRedirects[slug] ?? slug;
  const note = getNoteBySlug(resolvedSlug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: `/notes/${resolvedSlug}` },
    openGraph: {
      title: `${note.title} — Engineering Notes`,
      description: note.description,
      url: `https://nirjar.me/notes/${resolvedSlug}`,
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const redirectSlug = legacyNoteSlugRedirects[slug];
  if (redirectSlug) redirect(`/notes/${redirectSlug}`);

  const note = getNoteBySlug(slug);
  if (!note) notFound();

  const noteFull = notes.find((n) => n.slug === slug);
  if (!noteFull) notFound();

  const sorted = getAllNotes();
  const currentIndex = sorted.findIndex((n) => n.slug === slug);
  const prevNote = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const nextNote = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;

  return (
    <main className="min-h-[100dvh] bg-background xl:pl-[17.5rem]">
      <DocsNavigation notes={sorted} />
      <article className="mx-auto max-w-3xl px-4 pb-24 pt-12 sm:px-6 xl:px-10">
        <header className="mb-12 mt-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-4">
            Bastion
          </h1>
          <p className="text-secondary text-sm sm:text-base leading-relaxed max-w-2xl">
            {note.description}
          </p>
        </header>

        <div id="note-content" className="prose-custom">
          <MDXContent code={noteFull.code} />
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex items-center justify-between">
          <div>
            {prevNote ? (
              <Link href={`/notes/${prevNote.slug}`} className="group text-sm">
                <span className="text-secondary/60 font-mono text-xs">← Previous</span>
                <p className="text-foreground/80 group-hover:text-accent transition-colors mt-0.5">{prevNote.title}</p>
              </Link>
            ) : <div />}
          </div>
          <div className="text-right">
            {nextNote ? (
              <Link href={`/notes/${nextNote.slug}`} className="group text-sm">
                <span className="text-secondary/60 font-mono text-xs">Next →</span>
                <p className="text-foreground/80 group-hover:text-accent transition-colors mt-0.5">{nextNote.title}</p>
              </Link>
            ) : <div />}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
import DocsNavigation from "@/components/docs/DocsNavigation";
