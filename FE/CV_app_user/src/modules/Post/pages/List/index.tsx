import { FullContentLayout } from '@/shared';
import React, { useEffect, useState } from 'react';
import { recruitmentsAPI } from '@/modules/Home/shared/api2';
import { SearchPost } from '@/modules/Home/shared/AllApiService';
import Link from 'next/link';
import cx from 'classnames';
import styles from './styles.module.scss';

import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import SearchBar from '@/layouts/components/SearchBar';
import Image from 'next/image';
import PopularPost from '@/components/common/PopularPost';
import moment from 'moment';
import style from './styles.module.scss';
const Index = () => {
  // const payload: SearchPost = {
  //   enterprise_id: null,
  //   page: 1,
  //   pageSize: 10,
  // };
  const [payload, setPayload] = useState({
    fields_id: null,
    city: null,
    district: null,
    page: 1,
    pageSize: 10,
  });
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getPost = async () => {
    try {
      const res = await recruitmentsAPI.getAllPostForUser(payload);
      console.log(res);
      setPosts(res.data);
    } catch (error) {
      console.error('Failed to fetch posts', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <FullContentLayout className={style.page}>
      <div className="container">
        <div className="tw-mb-5 tw-flex tw-gap-4">
          <SearchBar
            customStyle={{
              searchBar: 'tw-w-[44%] tw-absolute tw-z-10 tw-translate-x-[10px]',
              searchBox__input: 'tw-h-[30px] -tw-translate-x-[10px]',
            }}
          />
        </div>
        <div className="row tw-mt-9">
          <div className={cx('col-md-8', style.listPost)}>
            {isLoading ? (
              <p>Loading....</p>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.job_post_id} className={style.postItem}>
                  <Paper className="tw-p-2 tw-flex tw-justify-between tw-mt-4">
                    <div className="mr-6 ">
                      <img className="object-fill h-48 w-96" src={post.image_url}></img>
                      <p>Mô tả</p>
                      {post.overView}
                    </div>
                    <div className={style.postItem}>
                      <div className={style.postHeader}>
                        <div>
                          <h3>{post.title}</h3>
                          <span>Lĩnh vực : {post.filedName}</span>
                          <p>Ngày tạo: {moment(post.createPost_at).format('DD/MM/YY')}</p>
                        </div>
                      </div>
                      <span>
                        Nơi làm việc : {post.city} <p></p> {post.district}
                      </span>
                      <p>Tạo bởi {post.enterpriseName}</p>
                      <Link href={`/Post?id=${post.job_post_id}`}>
                        <p>Liên hệ: {post.contact_email}</p>
                      </Link>
                      <p>SDT: {post.contact_phone}</p>
                    </div>
                  </Paper>
                </div>
              ))
            ) : (
              <div className={style.noPosts}>
                <p className={style.noPosts__title}>Không có bài viết nào</p>
                <Link href="/explore">
                  <a>
                    <button
                      type="button"
                      className={cx(style.noPosts__generalButton, 'btn btn-common')}
                    >
                      Theo dõi topic
                    </button>
                  </a>
                </Link>
                <Link href="/posts">
                  <a>
                    <button
                      type="button"
                      className={cx(style.noPosts__generalButton, 'btn btn-common')}
                    >
                      Tất cả
                    </button>
                  </a>
                </Link>
              </div>
            )}
            {posts.length > 0 && (
              <Paper className="tw-p-2 tw-flex tw-justify-center tw-mt-4">
                <Pagination count={5} page={1} shape="rounded" />
              </Paper>
            )}
          </div>
          <div className="col-md-4">
            <PopularPost />
          </div>
        </div>
      </div>
    </FullContentLayout>
  );
};

export default Index;
