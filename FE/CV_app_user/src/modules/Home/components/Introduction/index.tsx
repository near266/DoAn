import { Button } from '@mui/material';
import cx from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import styles from './styles.module.scss';

const Introduction = (props) => {
  const router = useRouter();
  const scrollNext = () => {
    const navBarHeight = 80;
    const height = window.innerHeight;
    window.scrollTo(0, height - navBarHeight);
  };
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);
  return (
    <section className={`${styles.introduction}`}>
      <div className="container tw-flex tw-items-center tw-w-full">
        <div className="tw-flex tw-items-start md:!tw-items-center tw-w-full md:!tw-flex-nowrap tw-flex-wrap tw-justify-between md:!tw-justify-between tw-h-full tw-m-0">
          <div className={cx(styles.shortContent, '!tw-m-auto')}>
            <div
              className={`${styles.title} tw-flex-initial lg:!tw-text-[36px] 
              !tw-text-[35px] sm:tw-text-[30px] tw-text-2xl tw-text-left md:!tw-leading-[57px] tw-leading-[3.2rem]`}
            >
              Eztek <br />
              Nền tảng định hướng
              <br /> và kết nối việc làm cho giới trẻ
            </div>
            {/* <p className={styles.description}></p> */}
            <div className={`${styles.links} tw-flex tw-mt-6  tw-pb-4`}>
              {/* <Button
                className="tw-normal-case !tw-bg-[#403ECC] tw-not-italic tw-font-bold
                tw-tracking-[0.1px] tw-text-xl
                tw-leading-6 tw-text-center tw-text-white md:tw-px-8 !tw-rounded-[10px] md:tw-py-[16px] tw-py-[10px] tw-px-[42.5px]"
                variant="contained"
                onClick={() => {
                  router.push('/danh-gia-nang-luc');
                }}
              >
                Test ngay
              </Button> */}
            </div>
            <div className={styles.createPost}></div>
          </div>
          <div
            className={`${styles.youth_hero} xl:tw-translate-x-[100px] !tw-w-full tw-flex-initial tw-flex tw-justify-center tw-max-h-full tw-max-w-full md:!tw-justify-end tw-relative tw-min-h-[300px] sm:tw-min-h-[500px] tw-transition-opacity tw-duration-1000 `}
          >
            <Image
              src="/images/homepage/youth-hero-desktop.png"
              className="tw-max-h-full !tw-w-full tw-max-w-full"
              alt="Eztek"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </div>
      </div>
      <img
        onClick={scrollNext}
        className="bounce  tw-cursor-pointer tw-absolute tw-bottom-[-80px] md:!tw-bottom-0 tw-h-10 tw-left-1/2"
        src="/images/icons/bounce.svg"
      />
    </section>
  );
};

export default Introduction;
