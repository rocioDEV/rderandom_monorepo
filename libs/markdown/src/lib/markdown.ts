import { readFileSync } from 'fs';

import matter from 'gray-matter';

import { serialize } from 'next-mdx-remote/serialize';

import { join } from 'path';

interface ParsedFile {
  title: string;
  content: string;
}

export function parseFileBySlug(
  fileName: string,
  articlesPath: string
): ParsedFile {
  const path = join(articlesPath, `${fileName}.md`);
  const fileRawContent = readFileSync(path);
  const { data, content } = matter(fileRawContent);

  return { title: data.title, content };
}

export async function renderMarkdown(markDownContent = '') {
  return serialize(markDownContent);
}
