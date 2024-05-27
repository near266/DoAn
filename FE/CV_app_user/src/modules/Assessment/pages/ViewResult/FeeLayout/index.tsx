import cx from 'classnames';
import Link from 'next/link';

// import { AdSense } from '@/components';

import styles from './styles.module.scss';

const FeeLayout = (props) => {
  return (
    <div className={cx('container', styles.feeContent)}>
      <img
        className={styles.feeContent__image}
        // eslint-disable-next-line max-len
        src="https://storage.googleapis.com/youth-media/post-thumbnails/qyHI2OkIoPnSlivzKpDvxw6s4MGikhBR5FMGaeSI.png"
        alt="Membership"
      />
      <h3 style={{ fontSize: '26px', marginBottom: '20px' }}>
        Chúc mừng bạn đã hoàn thành đánh giá
      </h3>
      <p>
        Vui lòng đăng ký{' '}
        <a href="https://academy.youth.com.vn/san-sang-su-nghiep">
          Chương trình membership
        </a>{' '}
        của Eztek để xem kết quả.
      </p>
      {/* <div style={{ margin: '10px 0' }}>
        <AdSense adSlot="6856900542" />
      </div> */}
      <p>
        Làm đánh giá khác
        <Link href="/danh-gia-nang-luc">
          <a>tại đây.</a>
        </Link>
      </p>
      <p style={{ fontStyle: 'italic' }}>
        * Kết quả đánh giá sẽ được cập nhật trong trang cá nhân của bạn!
      </p>
    </div>
  );
};

FeeLayout.propTypes = {};

export default FeeLayout;
