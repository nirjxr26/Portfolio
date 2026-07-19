import { notes } from "../../.velite";

export type NoteMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  project: string;
  tags: string[];
  series?: string;
  part?: number;
};

export function getAllNotes(): NoteMeta[] {
  return notes
    .map((note) => ({
      slug: note.slug,
      title: note.title,
      description: note.description,
      date: note.date,
      project: note.project,
      tags: note.tags,
      series: note.series,
      part: note.part,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getNoteBySlug(slug: string): NoteMeta | undefined {
  return getAllNotes().find((n) => n.slug === slug);
}
