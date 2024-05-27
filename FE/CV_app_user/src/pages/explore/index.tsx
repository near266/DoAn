import { NoSsr } from '@mui/material';

import { HtmlHeader } from '@/layouts/components';
import Explore from '@/modules/Explore/pages';

const Page = () => {
  return (
    <>
      <HtmlHeader title="Khám phá - Eztek" />
      <NoSsr>
        <Explore />
      </NoSsr>
    </>
  );
};

export default Page;
