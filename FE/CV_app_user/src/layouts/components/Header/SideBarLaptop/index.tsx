import { useCurrentWidth } from '@/hooks/useCurrentWidth';
import { FILTER_OPTS } from '@/modules/TestAssessment/shared/variables';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
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

const SideBarLaptop = () => {
  const sideBarRef = useRef(null);
  const width = useCurrentWidth();
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
      {width > 1024 ? (
        <aside
          ref={sideBarRef}
          className={`${
            styles.sidebar
          } d-none d-xl-block tw-fixed tw-bg-[#FFFFFF] tw-left-0 ${
            width < 1440 && 'tw-w-[55px]'
          } tw-w-[80px] tw-h-full tw-z-[9999999999] hover:!tw-w-[204px]`}
        >
          <div className="tw-relative tw-h-[80px] tw-w-full tw-place-items-center	tw-flex tw-items-center tw-justify-center tw-gap-2">
            <Image
              src="/images/logo/youth-logo1.svg"
              alt="Logo"
              width={40}
              height={40}
              priority
            />
            <h2
              className={`${styles.ccompany_name} tw-m-0 tw-uppercase tw-text-[#22216D] tw-text-2xl md:tw-w-[117px]`}
            >
              EZTEK
            </h2>
          </div>
          <div className="d-flex tw-flex-col tw-h-full tw-pb-[100px]">
            <ul className="tw-flex tw-items-center tw-justify-center tw-flex-col tw-list-none tw-p-0 tw-m-0 last:tw-m-auto ">
              {sideBarItems.map((item, index) => (
                <li key={index} className="tw-w-full tw-no-underline tw-items-center	">
                  <Link href={item.link} prefetch={false}>
                    <a className={`${styles.link}`}>
                      <div
                        className={`${styles.borderLeft} tw-h-[40%]  tw-rounded tw-transform`}
                      ></div>
                      <div className="tw-flex tw-items-center tw-justify-center tw-w-full">
                        <div
                          className={`${styles.item_wrapper} tw-flex tw-items-center tw-justify-center  tw-relative tw-w-full`}
                        >
                          <Image
                            src={item.iconUrl}
                            alt={`${item.name} Eztek`}
                            width={32}
                            height={32}
                          />
                          <span
                            className={`${styles.label} tw-text-sm tw-text-gray-600  tw-ml-5`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="tw-block tw-mt-auto">
              <div className={styles.side_bar_items__footer}>
                <p className={styles.footer__title}>Về Eztek</p>
                {/* about Youth */}
                <div className={`${styles.side_bar_items} `}>
                  {sideBarAdditionItem.map((item, index) => (
                    <Link href={item.link} prefetch={false} key={index}>
                      <a className={`${styles.link}`}>
                        <div
                          className={`${styles.borderLeft} tw-h-[40%]  tw-rounded tw-transform`}
                        ></div>
                        <div
                          className={`${styles.item_wrapper} tw-flex tw-items-center tw-justify-center  tw-relative tw-w-full`}
                        >
                          <div className={''}>
                            <Image
                              src={item.iconUrl}
                              alt={`${item.name} Eztek`}
                              height={26}
                              width={26}
                            />
                          </div>
                          <span
                            className={`${styles.label} tw-text-sm tw-text-gray-600  tw-ml-5`}
                          >
                            {item.name}
                          </span>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      ) : (
        ''
      )}
    </>
  );
};

export default memo(SideBarLaptop);
