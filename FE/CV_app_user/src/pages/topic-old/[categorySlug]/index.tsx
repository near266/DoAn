import { GetServerSideProps } from 'next';
import { NoSsr } from '@mui/material';

import { fetchSSR } from '@/core';
import { HtmlHeader } from '@/layouts/components';
import ListByCategory from '@/modules/Post/pages/ListByCategory';

const Page = ({ category }) => {
  return (
    <>
      <HtmlHeader title={`${category.name} - Eztek`} />
      <NoSsr>
        <ListByCategory category={category} />
      </NoSsr>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetchSSR.callAPI(ctx, `categories/${ctx.params.categorySlug}`);

  if (res?.code !== 'SUCCESS') {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category: res.payload,
    },
  };
};

export default Page;
