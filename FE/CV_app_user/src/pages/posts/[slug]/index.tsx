import { GetServerSideProps } from 'next';

import { HtmlHeader } from '@/layouts/components';
import Show from '@/modules/Post/pages/Show';
import { fetchSSR } from '@/core';

const Page = ({
  post,
  author,
  isShowAction,
  followingUsersCount,
  authorPosts,
  referencePosts,
}) => {
  return (
    <>
      <HtmlHeader title={post.seo_title || post.name}>
        <meta name="description" content={post.seo_description || post.description} />
        <meta property="og:title" content={post.name} />
        <meta
          property="og:description"
          content={post.seo_description || post.description}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/posts/${post.slug}`}
        />
        <meta property="og:site_name" content="Eztek" />
        <meta property="og:image" content={post.avatar} />
        <meta property="og:locale" content="vi_VN" />

        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" type="text/css" href="/css/emoji-mart.css" />
      </HtmlHeader>
      <Show
        post={post}
        author={author}
        isShowAction={isShowAction}
        followingUsersCount={followingUsersCount}
        authorPosts={authorPosts}
        referencePosts={referencePosts}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetchSSR.callAPI(ctx, `posts/${ctx.params.slug}`);

  const payload = res.payload;

  if (res?.code !== 'SUCCESS') {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: payload.post,
      author: payload.author,
      isShowAction: payload.isShowAction,
      followingUsersCount: payload.followingUsersCount,
      authorPosts: payload.authorPosts,
      referencePosts: payload.referencePosts,
    },
  };
};

export default Page;
