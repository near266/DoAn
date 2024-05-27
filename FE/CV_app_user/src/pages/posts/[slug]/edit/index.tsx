import { GetServerSideProps } from 'next';

import { Auth, fetchSSR } from '@/core';
import { HtmlHeader } from '@/layouts/components';
import Edit from '@/modules/Post/pages/Edit';
import { DETAIL_POST_QUERY } from '@/modules/Post/shared';

const Page = ({ post }) => {
  return (
    <>
      <HtmlHeader title="Chỉnh sửa bài viết" />
      <Auth>
        <Edit post={post} />
      </Auth>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await fetchSSR.callGraphQL(ctx).query({
    query: DETAIL_POST_QUERY,
    variables: {
      slug: ctx.params.slug,
    },
  });

  if (!data.post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: data.post,
    },
  };
};

export default Page;
