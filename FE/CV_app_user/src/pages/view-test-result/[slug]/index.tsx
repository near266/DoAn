import { NoSsr } from '@mui/material';

import { HtmlHeader } from '@/layouts/components';
import ViewResult from '@/modules/Assessment/pages/ViewResult';

const Page = () => {
  return (
    <>
      <HtmlHeader title="Kết quả làm bài" />
      <NoSsr>
        <ViewResult />
      </NoSsr>
    </>
  );
};

export default Page;
