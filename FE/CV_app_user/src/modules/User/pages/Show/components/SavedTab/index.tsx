import { PostPagination } from '@/components';

const SavedTab = (props) => {
  return (
    <>
      <PostPagination
        apiUrl="user-bookmarks"
        message="Không có bài viết đã lưu nào"
        loadSuccess={() => props.onSetLoading(false)}
      />
    </>
  );
};

export default SavedTab;
