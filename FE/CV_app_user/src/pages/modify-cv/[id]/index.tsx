import { HtmlHeader } from '@/layouts/components';
import { Auth } from '@/core';
import Edit from '@/modules/Resume/pages/Edit';

const Page = () => {
  return (
    <>
      <HtmlHeader title="Chỉnh sửa CV Online" keepMetaData>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" type="text/css" href="/css/ReactCrop.min.css" />
        {/* TODO: Chuyen sang luu o database cha han */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://storage.googleapis.com/youth-media/template-standard.min.css"
        />
      </HtmlHeader>
      <Auth>
        <Edit />
      </Auth>
    </>
  );
};

export default Page;
