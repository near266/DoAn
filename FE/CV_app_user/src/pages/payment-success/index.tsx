import { HtmlHeader } from '@/layouts/components';
import { Auth } from '@/core';
import { Purchase } from '@/modules/User/pages/Purchase';
import { GetServerSideProps } from 'next';
import { GET_ASSESSMENTS_QUERY } from '@/modules/Assessment/shared';
import { fetchSSR } from '@/core';

const Page = ({ assessments, step }) => {
  return (
    <>
      <HtmlHeader title="Giỏ hàng" />
      {/* <Auth> */}
      <Purchase assessments={assessments} step={step} />
      {/* </Auth> */}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  /* destructure data{assesments:{ data[] }} from the response
  and pass it to the component as props
  */

  const {
    data: {
      assessments: { data },
    },
  } = await fetchSSR.callGraphQL(context).query({
    query: GET_ASSESSMENTS_QUERY,
  });

  return {
    props: {
      assessments: data ?? [],
      step: 3,
    },
  };
};

export default Page;
