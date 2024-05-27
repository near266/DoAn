import { HtmlHeader } from '@/layouts/components';
import { Auth } from '@/core';
import Setting from '@/modules/User/pages/Setting';

const Page = () => {
  return (
    <>
      <HtmlHeader title="Cài đặt tài khoản" />
      <Auth>
        <Setting />
      </Auth>
    </>
  );
};

export default Page;
