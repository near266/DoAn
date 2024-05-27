import { HtmlHeader } from '@/layouts/components';
import { Auth } from '@/core';
import Create from '@/modules/Resume/pages/Create';

const Page = () => {
  return (
    <>
      <HtmlHeader title="Tạo CV Online ấn tượng" keepMetaData>
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
        <Create />
      </Auth>
    </>
  );
};

export default Page;
