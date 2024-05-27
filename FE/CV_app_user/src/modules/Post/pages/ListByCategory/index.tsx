import { FC } from 'react';
import { Paper } from '@mui/material';

import { ICategory } from '@/interfaces';
import { FollowButton } from '@/components';
import { FullContentLayout } from '@/shared';
import List from '../List';
import styles from './styles.module.scss';

interface IProps {
  category: ICategory;
}

const ListByCategory: FC<IProps> = ({ category }) => {
  return (
    <FullContentLayout className={styles.page}>
      <div className="container">
        <Paper className={styles.catInfo}>
          <div className={styles.overview}>
            <div className={styles.overview__image}>
              <img src={category.avatar} alt="Ảnh chuyên mục" />
            </div>
            <div>
              <p className={styles.overview__headline}>{category.name}</p>
              <p className={styles.overview__des}>{category.description}</p>
              <p>
                <span className={styles.overview__postCount}>{category.posts_count}</span>
                <span className={styles.overview__nameColor}> bài viết</span>
              </p>

              <FollowButton
                followType="category"
                isFollowed={category.followed}
                followId={category.id}
              />
            </div>
          </div>
        </Paper>
      </div>

      {/* TODO: Tìm cách dùng chung List post kiểu khác không cần rUri */}
      <List apiUrl={`categories/${category.id}/posts`} rUri={`/topic/${category.slug}`} />
    </FullContentLayout>
  );
};

export default ListByCategory;
