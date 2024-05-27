import { NoSsr } from '@mui/material';

import { HtmlHeader } from '@/layouts/components';
import Viral from '@/modules/Assessment/pages/ViralLink';

const index = () => {
  return (
    <>
      <HtmlHeader title="Nhập link viral" />
      <NoSsr>
        <Viral />
      </NoSsr>
    </>
  );
};

export default index;
