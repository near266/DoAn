import { HtmlHeader } from '@/layouts/components';
import { Auth } from '@/core';
import Rank from '@/modules/Rank';

const Page = () => {
  return (
    <>
      <HtmlHeader title="Bảng xếp hạng" />
      <Auth>
        <Rank />
      </Auth>
    </>
  );
};

export default Page;
