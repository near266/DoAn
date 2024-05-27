import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import { IRootState } from '@/store';
import { FollowButton } from '@/components';
import { requestGetAll } from '../shared';
import { ICategory } from '@/interfaces';
import styles from './styles.module.scss';

const Explore = () => {
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    getCategoryData();
    return () => {};
  }, []);

  const getCategoryData = async () => {
    const res = await requestGetAll();
    setCategories(res.payload);
  };

  return (
    <div className={cx('container', styles.page)}>
      <div className="row">
        {categories.map((item, index) => (
          <div key={index} className="col-md-6">
            <a href={`/topic/${item.slug}`}>
              <div
                className={cx(styles.feed, styles.shadowbox)}
                style={{
                  background: `url(${item.avatar}) 0 0/cover no-repeat scroll`,
                }}
              >
                <h3 className={styles.feed__name}>{item.name}</h3>
              </div>
            </a>
            {isAuthenticated && (
              <div className={styles.follow}>
                <FollowButton
                  followType="category"
                  isFollowed={item.followed}
                  followId={item.id}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Explore;
