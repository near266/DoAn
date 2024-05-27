// import { useState, useEffect } from 'react';
// import { Paper, Pagination } from '@mui/material';
// import { ceil } from 'lodash-es';

// import { BriefPost, EmptyData } from '../../index';
// import { PostSkeleton } from '@/skeletons';
// import { IPost } from '@/interfaces';
// import { httpClient } from '@/core';
// import styles from './styles.module.scss';

// interface IPostAttrs {
//   activePage: number;
//   pageCount: number;
//   pageRangeDisplayed: number;
// }

// interface IProps {
//   apiUrl: string;
//   message: string;
//   loadSuccess: () => any;
// }

// const PostPagination = (props: IProps) => {
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [postAttrs, setPostAttrs] = useState<IPostAttrs>({
//     pageCount: 0,
//     activePage: 1,
//     pageRangeDisplayed: screen.width >= 600 ? 8 : 3,
//   });

//   useEffect(() => {
//     getPostData(props.apiUrl, 1);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [props.apiUrl]);

//   const getPostData = async (apiUrl, page) => {
//     const response = await httpClient.get(`${apiUrl}?page=${page}`).finally(() => {
//       setIsLoading(false);
//       props.loadSuccess();
//     });

//     const posts = response.data.payload;

//     setPosts(posts.data);
//     setPostAttrs({
//       ...postAttrs,
//       activePage: posts.current_page,
//       pageCount: ceil(posts.total / posts.per_page),
//     });

//     window.scrollTo(0, 0);
//   };

//   const handlePageChange = (pageNumber) => {
//     if (pageNumber === postAttrs.activePage) return false;
//     getPostData(props.apiUrl, pageNumber);
//   };

//   // render
//   const Posts = posts.map((item, index) => <BriefPost key={index} post={item} />);

//   const Loading = Array(2)
//     .fill(0)
//     .map((item, index) => (
//       <Paper key={index} className={styles.listPost__feed}>
//         <PostSkeleton />
//       </Paper>
//     ));

//   return (
//     <div className={styles.listPost}>
//       {isLoading ? (
//         Loading
//       ) : Posts.length > 0 ? (
//         Posts
//       ) : (
//         <div className="no-posts">
//           <EmptyData message={props.message} />
//         </div>
//       )}

//       {Posts.length > 0 && (
//         <Paper className="tw-p-2 tw-flex tw-justify-center tw-mt-4">
//           <Pagination
//             count={postAttrs.pageCount}
//             page={postAttrs.activePage}
//             shape="rounded"
//             onChange={(event, page) => handlePageChange(page)}
//           />
//         </Paper>
//       )}
//     </div>
//   );
// };

// export default PostPagination;
import React from 'react';

const PostPagination = () => {
  return <div>index</div>;
};

export default PostPagination;
