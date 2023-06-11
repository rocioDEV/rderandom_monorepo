import { parseFileBySlug, renderMarkdown } from '@rderandom/libs/markdown';

import { readdirSync } from 'fs';

import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { join } from 'path';

import { ParsedUrlQuery } from 'querystring';

interface ArticleParams extends ParsedUrlQuery {
  slug: string;
}

interface ArticleProps {
  title: string;
  renderedMarkdown: MDXRemoteSerializeResult;
}

const POSTS_PATH = join(process.cwd(), '_articles');

export default function Article({ title, renderedMarkdown }: ArticleProps) {
  return (
    <div>
      <h1>{title}</h1>
      <MDXRemote {...renderedMarkdown} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<ArticleParams> = async ({
  params,
}: {
  params: ArticleParams;
}) => {
  // parse md (metadata + content)
  const { title, content } = parseFileBySlug(params.slug, POSTS_PATH);

  // render markdown as html
  const renderedMarkdown = await renderMarkdown(content);
  console.log('🚀 ~ file: [slug].tsx:41 ~ renderedMarkdown:', renderedMarkdown);
  return {
    props: {
      title,
      content,
      renderedMarkdown,
    },
  };
};

export const getStaticPaths: GetStaticPaths<ArticleParams> = async () => {
  const paths = readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.md/, ''))
    .map((slug) => ({
      params: { slug },
    }));

  return {
    paths: paths,
    fallback: false,
  };
};
