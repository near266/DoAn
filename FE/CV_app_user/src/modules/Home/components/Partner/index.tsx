import { useAutoAnimate } from '@formkit/auto-animate/react';
import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';

const partners = [
  {
    name: 'CSDS',
    imageUrl: '/images/homepage/csds-logo.png',
    desc: 'Trung tâm nghiên cứu phát triển bền vững - Bảo vệ pháp lý',
  },
  {
    name: 'JCI Vietnam',
    imageUrl: '/images/homepage/jci-logo.png',
    desc: 'Liên đoàn lãnh đạo và Doanh nhân trẻ Thế giới',
  },
  {
    name: 'Hội sinh viên',
    imageUrl: '/images/homepage/hoisinhvienvn-logo.png',
    desc: 'Hội sinh viên Đại học Xây Dựng',
  },
  {
    name: 'Google',
    imageUrl: '/images/homepage/google-logo.png',
    desc: 'Google Việt Nam',
  },
  {
    name: 'VNPAY',
    imageUrl: '/images/homepage/vnpay-logo.png',
    desc: 'Công ty cổ phần giải pháp thanh toán Việt Nam',
  },
  {
    name: 'FIIS',
    imageUrl: '/images/homepage/fiis-logo.png',
    desc: 'Trung tâm sáng tạo và ươm tạo FTU',
  },
  {
    name: 'CSDS',
    imageUrl: '/images/homepage/csds-logo.png',
    desc: 'Trung tâm nghiên cứu phát triển bền vững - Bảo vệ pháp lý',
  },
  {
    name: 'JCI Vietnam',
    imageUrl: '/images/homepage/jci-logo.png',
    desc: 'Liên đoàn lãnh đạo và Doanh nhân trẻ Thế giới',
  },
  {
    name: 'Hội sinh viên',
    imageUrl: '/images/homepage/hoisinhvienvn-logo.png',
    desc: 'Hội sinh viên Đại học Xây Dựng',
  },
  {
    name: 'SAC',
    imageUrl: '/images/homepage/sac-logo.png',
    desc: 'CLB Du học Đại học Ngoại thương',
  },
  {
    name: 'Google',
    imageUrl: '/images/homepage/google-logo.png',
    desc: 'Google Việt Nam',
  },
  {
    name: 'VNPAY',
    imageUrl: '/images/homepage/vnpay-logo.png',
    desc: 'Công ty cổ phần giải pháp thanh toán Việt Nam',
  },
  {
    name: 'FIIS',
    imageUrl: '/images/homepage/fiis-logo.png',
    desc: 'Trung tâm sáng tạo và ươm tạo FTU',
  },
];
const delay = 2500;
const Partner = (props) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const scrollRef = useRef(null);
  const [animateRef] = useAutoAnimate<HTMLDivElement>(/* optional config */);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) => (prevIndex === partners.length - 1 ? 0 : prevIndex + 1)),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <section className={`${styles.partner} hide_scrollbar tw-overflow-hidden  `}>
      <div className={cx(styles.partner__titleBox, 'container tw-bg-[#22216d] ')}>
        <div
          className={`${styles.partner__title} md:!tw-bg-[url('/images/homepage/partner-bg.svg')]`}
        >
          <p className="section-title"> Đối tác</p>
        </div>
      </div>

      <div className={cx(styles.partnerList, 'container')}>
        <div
          ref={animateRef}
          className={`${styles.partner__scrollbar} hide_scrollbar row tw-flex-nowrap tw-overflow-x-scroll container `}
        >
          {partners.map((item, index) => (
            <div key={index} className={cx(styles.partnerItem, 'col-md-3 col-sm-6')}>
              <div className={styles.partnerItem__boxLogo}>
                <div className={styles.partnerItem__logo}>
                  <img src={item.imageUrl} alt={item.name} />
                </div>
              </div>
              {/* <div className={styles.partnerItem__desc}>{item.desc}</div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partner;
