import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { CustomDropdown } from '@/components';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useCurrentWidth } from '@/hooks/useCurrentWidth';

import { httpClient } from '@/core';

const menuItems = [
  {
    name: 'Trang chủ',
    hideOnMobile: true,
    url: '/',
    iconUrl: '/images/icons/home_icon.svg',
    yieldName: 'sidebar_post',
  },
  {
    name: 'Tạo CV',
    hideOnMobile: true,
    url: 'https://15a8dbdf.resume-app-create.pages.dev/resume-builder',
    iconUrl: '/images/icons/sidebar/test-nav.svg',
    yieldName: 'sidebar_follow_post',
  },

  // {
  //   name: 'Sự kiện',
  //   hideOnMobile: true,
  //   url: '#',
  //   iconUrl: '/images/icons/sidebar/event.svg',
  //   yieldName: 'sidebar_assessment',
  //   children: null,
  // },

  // {
  //   name: 'Việc làm',
  //   hideOnMobile: true,
  //   url: null,
  //   actionClick: async () => {
  //     const response = await httpClient.get('/token');

  //     if (response.data.status == 'success') {
  //       window.location.href = 'https://job.youth.com.vn?token=' + response.data.token;
  //     } else {
  //       window.location.href = 'https://job.youth.com.vn';
  //     }
  //   },
  //   iconUrl: '/images/icons/sidebar/job.svg',
  //   yieldName: 'sidebar_assessment',
  //   children: null,
  // },
  {
    name: 'Bài viết',
    hideOnMobile: true,
    url: '/posts',
    iconUrl: '/images/icons/sidebar/blog.svg',
    yieldName: 'sidebar_assessment',
    children: null,
  },
];

const LinkOrATag = ({ menu, children, className }) =>
  menu.isBlank ? (
    <Link href={menu.url}>
      <a className={`${className} tw-relative`} target="_blank" rel="noreferrer">
        {children}
        <div className="tw-absolute"></div>
      </a>
    </Link>
  ) : (
    <Link href={menu.url}>
      <a className={`${className} tw-relative`}>
        {children}
        {className.includes('active') && (
          <div className="tw-absolute tw-w-[70%] tw-bottom-0 tw-left-1/2 -tw-translate-x-1/2 tw-h-[4px] tw-rounded-tr-[100px]  tw-rounded-tl-[100px] tw-bg-[#403ECC]"></div>
        )}
      </a>
    </Link>
  );

LinkOrATag.propTypes = {
  menu: PropTypes.object.isRequired,
  children: PropTypes.any,
  className: PropTypes.string,
};

const NavMenu = () => {
  const router = useRouter();
  const navRef = useRef(null);

  const activeClassName = (path) => {
    if (path === null) {
      return;
    }
    const currentPath = router.pathname;
    if (path.includes('http')) return;
    if (currentPath.split('/')[1] === path.split('/')[1]) {
      return 'active';
    }
  };
  const currentWindowWidth = useCurrentWidth();
  return (
    <nav
      ref={navRef}
      className="menu d-none d-sm-flex !tw-h-full tw-flex tw-justify-center tw-items-center"
    >
      <ul className="tw-flex !tw-h-full !tw-items-center tw-gap-[29px] tw-flex-wrap tw-overflow-hidden !tw-max-w-full">
        {menuItems.map((menu, menuIndex) =>
          menu.children ? (
            <li
              key={menuIndex}
              className={`${cx(
                'item more dropdown ',
                menu.hideOnMobile ? 'd-none d-lg-block ' : null
              )}!tw-h-full`}
            >
              {/* TODOKOGAP: active menu nhiều item className="menu-styled dropdown-toggle @foreach ($menu->yieldNames as $name)@yield($name)@endforeach" */}
              <CustomDropdown
                dropdownMenu={
                  <div className="dropdownMenu">
                    {menu.children.map((child, childIndex) => (
                      <LinkOrATag
                        className="tw-text-inherit tw-text-sm tw-px-2 tw-py-1 tw-flex"
                        key={childIndex}
                        menu={child}
                      >
                        <div className={cx('child-menu', activeClassName(child.url))}>
                          {child.name}
                        </div>
                      </LinkOrATag>
                    ))}
                  </div>
                }
              >
                <div className="menu-styled">
                  {menu.name}
                  <i className="fas fa-angle-down more-icon" />
                </div>
              </CustomDropdown>
            </li>
          ) : (
            <li
              key={menuIndex}
              className={cx(
                'item tw-h-full tw-items-center lg:tw-gap-2',
                menu.hideOnMobile ? 'd-none d-lg-flex ' : null
              )}
            >
              <Image
                src={menu.iconUrl}
                alt={menu.name}
                width={24}
                height={24}
                style={{
                  ...(activeClassName(menu.url) === 'active'
                    ? {
                        // 'invert(9%) sepia(1408%) saturate(2453%) hue-rotate(237deg) brightness(69%) contrast(197%)',
                      }
                    : { filter: 'grayscale(1)' }),
                }}
              />
              {menu.url ? (
                <LinkOrATag
                  menu={menu}
                  className={cx(
                    'menu-styled ',
                    activeClassName(menu.url),
                    'tw-relative '
                  )}
                >
                  {menu.name}
                </LinkOrATag>
              ) : (
                <a
                  className="menu-styled tw-relative "
                  // onClick={() => {
                  //   menu.actionClick();
                  // }}
                >
                  {menu.name}
                </a>
              )}
            </li>
          )
        )}

        <li className="item tw-h-full more dropdown d-block d-lg-none">
          <CustomDropdown
            dropdownMenu={
              <div className="dropdownMenu">
                {menuItems.map(
                  (menu, menuIndex) =>
                    menu.hideOnMobile &&
                    /* menu children */
                    (menu.children ? (
                      menu.children.map((menuChild, menuChildIndex) => (
                        <div key={menuChildIndex} className="child-menu">
                          <LinkOrATag
                            className={cx(
                              'tw-text-inherit tw-text-sm tw-px-2 tw-py-1 tw-flex',
                              activeClassName(menuChild.url)
                            )}
                            menu={menuChild}
                          >
                            {menuChild.name}
                          </LinkOrATag>
                        </div>
                      ))
                    ) : (
                      <div key={menuIndex} className="child-menu">
                        <LinkOrATag
                          className={cx(
                            'tw-text-inherit tw-text-sm tw-px-2 tw-py-1 tw-flex',
                            activeClassName(menu.url)
                          )}
                          menu={menu}
                        >
                          {menu.name}
                        </LinkOrATag>
                      </div>
                    ))
                )}
              </div>
            }
          >
            {/* temponary hide this by remove d-sm-flex ->(dsmflex) adtribute */}
            {
              <div className="menu-styled d-none dsmflex !tw-h-full tw-cursor-pointer">
                More <i className="fas fa-angle-down more-icon tw-mx-2" />
              </div>
            }
          </CustomDropdown>
        </li>
      </ul>
    </nav>
  );
};

NavMenu.propTypes = {};

export default NavMenu;
