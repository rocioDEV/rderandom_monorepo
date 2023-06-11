import { readFileSync } from 'fs';

import matter from 'gray-matter';

import { serialize } from 'next-mdx-remote/serialize';

import { join } from 'path';

interface ParsedFile {
  content: string;
  frontMatter: {
    title: string;
    tags: string[];
  };
}

export function parseFileBySlug(
  fileName: string,
  articlesPath: string
): ParsedFile {
  const path = join(articlesPath, `${fileName}.mdx`);
  const fileRawContent = readFileSync(path);
  const { data, content } = matter(fileRawContent);

  return { frontMatter: { title: data.title, tags: data.tags }, content };
}

export async function renderMarkdown(markDownContent = '') {
  return serialize(markDownContent);
}
