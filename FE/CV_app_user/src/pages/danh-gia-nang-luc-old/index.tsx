import { NoSsr } from '@mui/material';

import { HtmlHeader } from '@/layouts/components';
import List from '@/modules/Assessment/pages/List';

const Page = () => {
  return (
    <>
      <HtmlHeader title="Đánh giá năng lực" />
      <NoSsr>
        <List />
      </NoSsr>
    </>
  );
};

export default Page;
