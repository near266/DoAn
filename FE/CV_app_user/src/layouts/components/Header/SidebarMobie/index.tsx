import { FILTER_OPTS } from '@/modules/TestAssessment/shared/variables';
import { Common } from '@/shared';
import { Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import styles from './styles.module.scss';

const defaultSize = 24;
const MenuWrap = (props) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const sideChanged = true;

    if (sideChanged) {
      setHidden(true);

      setTimeout(() => {
        show();
      }, props.wait);
    }
  }, []);

  let style;
  const show = () => {
    setHidden(false);
  };
  useEffect(() => {
    if (hidden) {
      style = { display: 'none' };
    }
  }, [hidden]);

  return (
    <div style={style} className={props.side}>
      {props.children}
    </div>
  );
};
const sideBarItems = [
  {
    name: 'Tất cả',
    iconUrl: '/images/icons/sidebar/all.svg',
    link: `/danh-gia-nang-luc?${FILTER_OPTS.ALL}`,
  },
  {
    name: 'Cho bạn',
    iconUrl: '/images/icons/sidebar/for-you.svg',
    link: `/danh-gia-nang-luc?${FILTER_OPTS.LASTEST}`,
  },
  {
    name: 'Yêu thích',
    iconUrl: '/images/icons/sidebar/love-it.svg',
    link: `/danh-gia-nang-luc?${FILTER_OPTS.POPULAR}`,
  },
  {
    name: 'Đánh giá',
    iconUrl: '/images/icons/sidebar/post.svg',
    link: '/danh-gia-nang-luc',
  },
  {
    name: 'Mentor',
    iconUrl: '/images/icons/sidebar/mentor.svg',
    link: 'https://mentor.youth.com.vn',
  },
  {
    name: 'Sự kiện',
    iconUrl: '/images/icons/sidebar/event.svg',
    link: '/danh-gia-nang-luc',
  },
  {
    name: 'Khoá học',
    iconUrl: '/images/icons/sidebar/courses.svg',
    link: 'https://course.youth.com.vn/',
  },
  {
    name: 'Việc làm',
    iconUrl: '/images/icons/sidebar/job.svg',
    link: '/topic/viec-lam',
  },
  {
    name: 'Bài viết',
    iconUrl: '/images/icons/sidebar/blog.svg',
    link: '/posts',
  },
];

const sideBarAdditionItem = [
  {
    name: 'Giới thiệu',
    iconUrl: '/images/icons/sidebar/about.svg',
    link: '/privacy-policy',
  },
  {
    name: 'Liên hệ',
    iconUrl: '/images/icons/sidebar/contact.svg',
    link: '/privacy-policy',
  },
  {
    name: 'Điều khoản',
    iconUrl: '/images/icons/sidebar/term.svg',
    link: '/privacy-policy',
  },
  {
    name: 'Cộng đồng',
    iconUrl: '/images/icons/sidebar/community.svg',
    link: '/privacy-policy',
  },
];
const SideBarMobie = (props) => {
  const closeSidebar = () => {
    const element = document.getElementsByClassName('bm-overlay')[0];
    if (element instanceof HTMLElement) {
      element.click();
    }
  };
  const handleLogin = () => {
    Common.redirectToAuthenticate();
  };
  const router = useRouter();
  const [sidebarRoute, setsidebarRoute] = useState(sideBarItems);

  useEffect(() => {
    if (router.pathname === '/posts' || router.pathname === '/for-you') {
      setsidebarRoute((pre) => {
        pre[0].link = '/posts';
        pre[1].link = '/for-you';
        return [...pre];
      });
    } else {
      setsidebarRoute((pre) => {
        pre[0].link = `/danh-gia-nang-luc?${FILTER_OPTS.ALL}`;
        pre[1].link = `/danh-gia-nang-luc?${FILTER_OPTS.LASTEST}`;
        return [...pre];
      });
    }
  }, [router]);
  return (
    <>
      <MenuWrap wait={1000} side={'right'}>
        <Menu width={'70%'} isOpen={false}>
          <main
            id="side_bar_wrap"
            className="tw-pl-[25px] tw-h-full tw-w-full tw-block tw-mr-5"
          >
            <div className="tw-block">
              <div className="side_bar__header tw-mt-4 tw-mb-3 tw-flex tw-justify-between tw-w-full tw-items-center">
                <div className="tw-flex tw-items-center">
                  <i
                    className="fas fa-times tw-cursor-pointer tw-text-xl tw-text-[#92929D] tw-flex tw-items-center tw-justify-center tw-h-6 tw-w-6"
                    onClick={closeSidebar}
                  ></i>
                  <Link href="/" prefetch={false}>
                    <a>
                      <div className="tw-flex tw-items-center">
                        <div className="logo-image">
                          <Image
                            src="/images/logo/logo-website.png"
                            alt="Youth"
                            height={defaultSize}
                            width={defaultSize}
                          />
                        </div>
                        <h2
                          className="tw-not-italic tw-font-LexendDeca
                    tw-uppercase tw-font-semibold tw-text-base tw-leading-6 tw-text-[#22216D] tw-mb-0 tw-ml-1 d-lg-block"
                        >
                          Eztek
                        </h2>
                      </div>
                    </a>
                  </Link>
                </div>
                <Link href="/cart" prefetch={false}>
                  <div className="shopping_cart">
                    <Image
                      className="tw-mr-4 md:tw-mr-0 tw-cursor-pointer"
                      src="/images/icons/shopping-cart.svg"
                      alt="shopping-cart"
                      height={24}
                      width={24}
                      priority
                    />
                  </div>
                </Link>
              </div>
              <div className={styles.side_bar_items}>
                {sideBarItems.map((item) => (
                  <Link href={item.link} key={item.name} prefetch={false}>
                    <a key={item.name} className={styles.side_bar_items__links}>
                      <div className="tw-flex tw-items-center">
                        <div
                          className={`${styles.side_bar_items__icons}tw-mr-2 !tw-grayscale`}
                        >
                          <img
                            src={item.iconUrl}
                            alt={item.name}
                            height={defaultSize}
                            width={defaultSize}
                          />
                        </div>
                        <p className={`${styles.side_bar_items__content} `}>
                          {item.name}
                        </p>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
              <div className={styles.side_bar_items__buttons}>
                <Button
                  className="nav-button tw-normal-case !tw-w-full !tw-text-white !px-2 !tw-py-2 !tw-bg-[#403ECC] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] "
                  // hover:!tw-bg-white hover:!tw-text-[#403ECC]
                  variant="contained"
                  onClick={handleLogin}
                >
                  Đăng nhập
                </Button>
                <Button
                  className="nav-button tw-normal-case !tw-w-full !tw-text-[#403ECC] !px-2 !tw-py-2 !tw-bg-white tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] "
                  // hover:!tw-bg-[#403ECC] hover:!tw-text-white
                  variant="outlined"
                  // onClick={}
                >
                  Doanh nghiệp
                </Button>
              </div>
            </div>
            <div className="tw-block">
              <div className={styles.side_bar_items__footer}>
                <p className={styles.side_bar_items__footer__title}>Về Eztek</p>
                {/* about Youth */}
                <div className={`${styles.side_bar_items} `}>
                  {sideBarAdditionItem.map((item) => (
                    <Link href={item.link} key={item.name} prefetch={false}>
                      <a className={`${styles.side_bar_items__links} tw-my-[5px]`}>
                        <div className="tw-flex tw-items-center">
                          <div
                            className={`${styles.side_bar_items__icons}tw-mr-2 !tw-grayscale`}
                          >
                            <img
                              src={item.iconUrl}
                              alt={`${item.name} Eztek`}
                              height={defaultSize}
                              width={defaultSize}
                            />
                          </div>
                          <p className={`${styles.side_bar_items__content} `}>
                            {item.name}
                          </p>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </Menu>
      </MenuWrap>
    </>
  );
};
SideBarMobie.propTypes = {};

export default memo(SideBarMobie);
