import { NoSsr } from '@mui/material';

import { HtmlHeader } from '@/layouts/components';
import List from '@/modules/Post/pages/List';

const Page = () => {
  return (
    <>
      <HtmlHeader title="Bài viết đang theo dõi - Eztek" />
      <NoSsr>
        {/* TODO: Tìm cách dùng chung List post kiểu khác không cần rUri */}
        <List apiUrl="posts/followed" rUri="for-you" />
      </NoSsr>
    </>
  );
};

export default Page;
