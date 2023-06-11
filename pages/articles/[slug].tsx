import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticPropsContext, PreviewData } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ParsedUrlQuery } from 'querystring';

import { parseFileBySlug, renderMarkdown } from '@rderandom/libs/markdown';
import { Youtube } from '@rderandom/shared/mdx-elements';

import { POSTS_PATH } from './constants';

interface ArticleParams extends ParsedUrlQuery {
  slug: string;
}

interface ArticleProps {
  title: string;
  tags: string[];
  renderedMarkdown: MDXRemoteSerializeResult;
}

const mdxComponents = {
  Youtube,
};

export default function Article({
  title,
  renderedMarkdown,
  tags,
}: ArticleProps) {
  return (
    <div>
      <h1>{title}</h1>
      {tags && tags.map((tag) => <p key={tag}>#{tag}</p>)}
      <MDXRemote {...renderedMarkdown} components={mdxComponents} />
    </div>
  );
}

export const getStaticProps = async (
  context: GetStaticPropsContext<ArticleParams, PreviewData>
) => {
  const { params } = context;
  if (!params) {
    throw Error('No params provided for articles/[slug] getStaticProps');
  }
  // parse md (separate frontMatter + content)
  const { frontMatter, content } = parseFileBySlug(params.slug, POSTS_PATH);
  const { title, tags } = frontMatter;

  // render markdown as html to pass it to MDXRemote
  const renderedMarkdown = await renderMarkdown(content);

  return {
    props: {
      title,
      tags,
      content,
      renderedMarkdown,
    },
  };
};

export const getStaticPaths: GetStaticPaths<ArticleParams> = async () => {
  const paths = readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.mdx/, ''))
    .map((slug) => ({
      params: { slug },
    }));

  return {
    paths: paths,
    fallback: false,
  };
};
