import { HtmlHeader } from '@/layouts/components';
import { Auth } from '@/core';
import Initialization from '@/modules/Resume/pages/Initialization';

const Page = () => {
  return (
    <>
      <HtmlHeader title="Tổng hợp mẫu CV xin việc chuẩn, độc đáo - Eztek" />
      <Auth>
        <Initialization />
      </Auth>
    </>
  );
};

export default Page;
