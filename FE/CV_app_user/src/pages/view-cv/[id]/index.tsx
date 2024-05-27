// import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { NoSsr } from '@mui/material';

import { fetchSSR } from '@/core';
import { HtmlHeader } from '@/layouts/components';
import Show from '@/modules/Resume/pages/Show';

const Page = ({ resume }) => {
  return (
    <>
      <HtmlHeader title={resume.title}>
        <meta name="description" content="Xem CV online" />
        <meta property="og:title" content={resume.title} />
        <meta property="og:description" content="Xem CV online" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/images/thumbnail.png`}
        />
      </HtmlHeader>
      <NoSsr>
        <Show resume={resume} />
      </NoSsr>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetchSSR.callAPI(ctx, `cv-profiles/${ctx.params.id}?pageHtml=true`);

  if (res.code !== 'SUCCESS') {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      resume: res.payload,
    },
  };
};

Page.hideLayout = true;
export default Page;
