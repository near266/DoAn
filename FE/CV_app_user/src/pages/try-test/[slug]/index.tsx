import { Auth } from '@/core';
import { HtmlHeader } from '@/layouts/components';
import TryTest from '@/modules/Assessment/pages/TryTest';

const Page = () => {
  return (
    <>
      <HtmlHeader title="Làm bài đánh giá năng lực" />
      <Auth>
        <TryTest />
      </Auth>
    </>
  );
};

export default Page;
