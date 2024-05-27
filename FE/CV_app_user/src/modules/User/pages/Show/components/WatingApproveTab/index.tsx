import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Paper } from '@mui/material';
import cx from 'classnames';

import { httpClient } from '@/core';
import { IPost } from '@/interfaces';
import { ContainerLoading, EmptyData } from '@/components';
import styles from './styles.module.scss';

const WatingApproveTab = (props) => {
  const [isLoadingTab, setIsLoadingTab] = useState(true);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    async function getData() {
      const response = await httpClient
        .get('posts/wating-approve', {
          params: {
            fields: 'id,name,description,slug',
          },
        })
        .finally(() => {
          props.onSetLoading(false);
          setIsLoadingTab(false);
        });

      const res = response.data;
      if (res?.code === 'SUCCESS') {
        setPosts(res.payload);
      }
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Posts = !isLoadingTab && posts.length !== 0 && (
    <>
      <Paper className={cx(styles.tab__content, 'text-primary')}>
        Các bài viết đã tạo thành công và đang chờ hệ thống phê duyệt.
      </Paper>
      {posts.map((item) => (
        <Paper key={item.id} className={styles.post}>
          <div className={styles.postStatus}>
            <span className={styles.postStatus__info}>Chờ duyệt</span>
            <Link href={`/posts/${item.slug}/edit`}>
              <a className={cx(styles.postStatus__action, 'btn btn-warning')}>Sửa</a>
            </Link>
          </div>
          <h3 className={styles.post__title}>{item.name}</h3>
          <span className={styles.post__description}>{item.description}</span>
        </Paper>
      ))}
    </>
  );
  const EmptyPost = !isLoadingTab && posts.length === 0 && (
    <EmptyData message="Không có bài viết chờ duyệt nào" />
  );
  return (
    <ContainerLoading loading={isLoadingTab}>
      <div className={styles.tab}>{Posts}</div>
      {EmptyPost}
    </ContainerLoading>
  );
};

export default WatingApproveTab;
