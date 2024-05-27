import { GetServerSideProps } from 'next';

import { HtmlHeader } from '@/layouts/components';
import Show from '@/modules/Assessment/pages/Show';
import { fetchSSR } from '@/core';
import { DETAIL_ASSESSMENTS_QUERY, DETAIL_SIL_QUERY } from '@/modules/Assessment/shared';

const Page = ({ ast }) => {
  return (
    <>
      <HtmlHeader title={ast.name}>
        <meta name="description" content={ast.description} />
        <meta property="og:title" content={ast.name} />
        <meta property="og:description" content={ast.description} />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/danh-gia-nang-luc/${ast.slug}`}
        />
        <meta property="og:site_name" content="Eztek" />
        <meta property="og:image" content={ast.avatar} />
        <meta property="og:locale" content="vi_VN" />

        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" type="text/css" href="/css/ckeditor-content-styles.css" />
      </HtmlHeader>
      <Show ast={ast} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug, event } = ctx.query;

  const { data } = await fetchSSR.callGraphQL(ctx).query({
    query: event ? DETAIL_SIL_QUERY : DETAIL_ASSESSMENTS_QUERY,
    variables: {
      slug: slug,
    },
  });

  let ast = {};
  if (!data) {
    return {
      notFound: true,
    };
  }
  if (event && data.sil) {
    // deep copy object
    const sils = { ...data.sil };
    sils.isEvent = true;
    ast = sils;
  }
  if (data.assessment) {
    ast = data.assessment;
  }

  return {
    props: {
      ast: ast,
    },
  };
};

export default Page;
