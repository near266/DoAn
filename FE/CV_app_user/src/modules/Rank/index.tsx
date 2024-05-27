import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import { IRootState } from '@/store';
import { httpClient } from '@/core';
import styles from './styles.module.scss';

const Rank = () => {
  const me = useSelector((state: IRootState) => state.auth.me);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await httpClient.get('ranking');
      const res = response.data;

      setPoints(res.payload);
    }

    getData();
  }, []);

  return (
    <section className={styles.page}>
      <div className="container">
        <div className="row">
          <div className={cx(styles.rank, 'col-md-8')}>
            <h3 className={styles.rank__title}>Bảng xếp hạng</h3>
            <div className={cx(styles.content, styles.header)}>
              <div className={styles.content__no}>#</div>
              <div className={styles.content__name}>Thành viên</div>
              <div className={styles.content__points}>Points</div>
            </div>
            {points.map((item, index) => (
              <div key={index} className={styles.content}>
                <div className={styles.content__no}>
                  {item.rank === 1 ? (
                    <img
                      className={styles.content__medal}
                      src="/images/icons/gold-medal.svg"
                      alt="gold-medal"
                    />
                  ) : item.rank === 2 ? (
                    <img
                      className={styles.content__medal}
                      src="/images/icons/silver-medal.svg"
                      alt="silver-medal"
                    />
                  ) : item.rank === 3 ? (
                    <img
                      className={styles.content__medal}
                      src="/images/icons/bronze-medal.svg"
                      alt="bronze-medal"
                    />
                  ) : (
                    item.rank
                  )}
                </div>
                <div className={styles.content__name}>
                  <a href={`/profile/${item.username}`}>
                    <img
                      className="avatar-user-general"
                      src={item.user_avatar}
                      alt="avatar"
                    />
                    {item.user_name}
                    {item.user_id === me.id && <span>&nbsp;(bạn)</span>}
                  </a>
                </div>
                <div className={styles.content__points}>{item.value}</div>
              </div>
            ))}
          </div>
          <div className={cx(styles.info, 'col-md-4')}>
            <div className={styles.info__box}>
              <h3 className={styles.info__title}>Bảng xếp hạng là gì?</h3>
              <p>
                Bảng xếp hạng nhằm thể hiện, vinh danh các cá nhân có điểm số xuất sắc
                đóng góp cho Eztek .
              </p>
              <p>
                Points có thể được nhận bằng việc đăng bài, tham gia tương tác trên
                website,... Vì vậy hãy viết những bài thật chất lượng để có thật nhiều
                point nhé.
              </p>
            </div>
            <div className={styles.info__box}>
              <h3 className={styles.info__title}>Points dùng để làm gì?</h3>
              <p>
                Bằng việc tích lũy nhiều points, bạn có thể nhận được những gói quà tặng,
                ưu đãi, khóa học, ...Points có thể có được bằng các hoạt động trên
                website. Tuy nhiên, bạn hoàn toàn có thể bị trừ points nếu vi phạm nội quy
                hoặc bị báo xấu từ cộng đồng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rank;
