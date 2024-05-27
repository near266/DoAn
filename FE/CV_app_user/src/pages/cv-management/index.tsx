import { HtmlHeader } from '@/layouts/components';
import { Auth } from '@/core';
import Management from '@/modules/Resume/pages/Management';
import ManagementCV from '@/modules/Resume/pages/NewManagement';

const Page = () => {
  return (
    <>
      <HtmlHeader title="Quản lý CV" />
      <Auth>
        {/* <Management /> // code cu */}

        {/* code moi */}
        <ManagementCV></ManagementCV>
      </Auth>
    </>
  );
};

export default Page;
