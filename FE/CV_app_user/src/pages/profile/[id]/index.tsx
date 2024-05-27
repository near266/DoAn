import { GetServerSideProps } from 'next';

import { HtmlHeader } from '@/layouts/components';
import Show from '@/modules/User/pages/Show';
import { fetchSSR } from '@/core';

const Page = ({ personal }) => {
  const htmlTitle = `Trang cá nhân - ${personal.name}`;
  return (
    <>
      <HtmlHeader title={htmlTitle}>
        <meta name="description" content={personal.information} />
        <meta property="og:title" content={htmlTitle} />
        <meta property="og:description" content={personal.information} />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/profile/${personal.username}`}
        />
        <meta property="og:site_name" content="Eztek" />
        <meta property="og:image" content={personal.avatar} />
        <meta property="og:locale" content="vi_VN" />
      </HtmlHeader>
      <Show personal={personal} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const paramsString = new URLSearchParams({
    fields: 'id,name,address,information,avatar,username,',
  }).toString();

  // const res = await fetchSSR.callAPI(
  //   ctx,
  //   `http://localhost:8080/api/UserInfo/auth/me?id=${paramsString}`
  // );
  // console.log(res);
  const { id: personal } = ctx.query;
  return {
    props: {
      personal,
    },
  };
};

export default Page;
