import { NoSsr } from '@mui/material';

import { HtmlHeader } from '@/layouts/components';
import List from '@/modules/Post/pages/List';
import SearchBar from '@/layouts/components/SearchBar';

const Page = () => {
  return (
    <>
      <HtmlHeader title="Tất cả bài viết - Eztek" />
      <NoSsr>
        <List apiUrl="posts" />
      </NoSsr>
    </>
  );
};

export default Page;
