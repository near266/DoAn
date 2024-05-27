import { Component, useEffect, useState } from 'react';
import Link from 'next/link';

import { httpClient } from '@/core';
import { formatServerDateToDurationString } from '@/helpers/date-helper';
import styles from './styles.module.scss';

// interface IState {
//   isLoading: boolean;
//   posts: any[];
//   categories: any[];
// }

// export class PopularPost extends Component<any, IState> {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: true,
//       posts: [],
//       categories: [],
//     };
//   }

//   componentDidMount() {
//     this.getPostData();
//   }

//   getPostData() {
//     httpClient.get('posts/popular').then((response) => {
//       const posts = response.data.payload.posts;
//       const categories = response.data.payload.categories;
//       this.setState({
//         posts: posts,
//         categories: categories,
//       });
//     });
//   }

//   render() {
//     return (
//       <div className={styles.popularPost}>
//         <h2>Nổi bật trong tháng</h2>
//         <div className={styles.posts}>
//           {this.state.posts.map((item, index) => (
//             <div className={styles.posts__line} key={index}>
//               <div className={styles.posts__leftContent}>
//                 <Link href={`/profile/${item.creator.username}`}>
//                   <a title={item.creator.name}>
//                     <img
//                       className="avatar-user-general"
//                       src={item.creator.avatar}
//                       alt="avatar"
//                     />
//                   </a>
//                 </Link>
//               </div>
//               <div className={styles.posts__rightContent}>
//                 <Link href={`/posts/${item.slug}`}>
//                   <a className={styles.posts__title}>{item.name}</a>
//                 </Link>
//                 <span className={styles.posts__time}>
//                   {formatServerDateToDurationString(item.created_at)}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         <h2 className={styles.popularPost__categoryTitle}>Danh mục nổi bật</h2>
//         <div className={styles.categories}>
//           {this.state.categories.map((item, index) => (
//             <div className={styles.categories__line} key={index}>
//               <div className={styles.categories__leftContent}>
//                 <Link href={`/topic/${item.slug}`}>
//                   <a title={item.name}>
//                     <img
//                       className={styles.categories__avatar}
//                       src={item.avatar}
//                       alt="avatar"
//                     />
//                   </a>
//                 </Link>
//               </div>
//               <div className={styles.categories__rightContent}>
//                 <Link href={`/topic/${item.slug}`}>
//                   <a className={styles.categories__title}>{item.name}</a>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }
import React from 'react';
import { useSelector } from 'react-redux';
import { recruitmentsAPI } from '@/modules/Home/shared/api2';
import { Button, message } from 'antd';

const PopularPost = () => {
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(false);

  const { loading, data, succeeded } = useSelector((state: any) => state.login);
  if (data === null) {
    return (
      <>
        <div className={styles.popularPost}>
          <h2>Các bài viết đã ứng tuyển</h2>
          <p>Hãy đăng nhập để xem thông tin</p>
        </div>
      </>
    );
  }
  const [payload, setPayload] = useState({
    userId: data.id,
    title: null,
    fields_id: null,
    page: 1,
    pageSize: 10,
  });
  const getData = async () => {
    const res = await recruitmentsAPI.getAllPostForUserApprove(payload);
    console.log(res.data);
    setPosts(res.data);
  };
  const handleDelete = async (idT: number) => {
    const payloadDelete = {
      id: idT,
    };
    const res = await recruitmentsAPI.DeletePostCandidate(payloadDelete);
    if (res) {
      setLoad(!load);
      message.success('Hủy  ứng tuyển thành công');
    }
  };
  useEffect(() => {
    getData();
  }, [load]);

  return (
    <div className={styles.popularPost}>
      <h2>Các bài viết đã ứng tuyển</h2>
      <div className={styles.posts}>
        {posts.map((item, index) => (
          <div className={styles.posts__line} key={index}>
            <div className={styles.posts__leftContent}>
              <Link href={`/Post?id=${item.job_post_id}`}>
                <a title={item.title}>
                  <img
                    className="avatar-user-general"
                    src={item.image_url}
                    alt="avatar"
                  />
                </a>
              </Link>
            </div>
            <div className={styles.posts__rightContent}>
              <p>{item.title}</p>
              <span className="flex">
                <p>Trạng thái:</p>
                {item.status_id == 0
                  ? 'Đang chờ phê duyệt'
                  : item.status_id == 1
                  ? 'Đã được tiếp nhận'
                  : 'Từ chối'}
              </span>
              <div className="flex tw-justify-between">
                <a
                  className={styles.posts__title}
                  href={item.cv_path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="mr-4" type="primary">
                    Xem Cv
                  </Button>
                </a>
                <Button type="primary" onClick={() => handleDelete(item.id)}>
                  Hủy ứng tuyển
                </Button>
              </div>

              <span className={styles.posts__time}>
                {formatServerDateToDurationString(item.created_at)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPost;
