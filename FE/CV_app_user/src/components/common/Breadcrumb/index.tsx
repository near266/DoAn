import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import styles from './styles.module.scss';

import Image from 'next/image';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { useLayoutEffect, useState } from 'react';
const mapPathToLabel = (path: string) => {
  switch (path) {
    case '/':
      return 'Trang chủ';
    case '':
      return 'Trang chủ';
    case 'danh-gia-nang-luc':
      return 'Tạo Cv';

    case 'events':
      return 'Sự kiện';
    case 'for-you':
      return 'Cho bạn';
    case 'course':
      return 'Khóa học';
    case 'jobs':
      return 'Việc làm';
    case 'posts':
      return 'Bài viết';
    default:
      return '';
  }
};

const generateBreadcrumb = (router: NextRouter) => {
  const { pathname } = router;
  const path = pathname.split('/').map((item, index) => {
    return {
      id: index,
      label: mapPathToLabel(item),
      href: `/${item}`,
    };
  });
  return path;
};

const hideBreadcrumb = (router: NextRouter) => {
  const { pathname } = router;
  const path = pathname.split('/')[1];
  switch (path) {
    case 'cart':
      return false;
    case '':
      return false;
    case 'danh-gia-nang-luc':
      return true;
    default:
      return false;
  }
};

export default function BreadCumb(props) {
  const router = useRouter();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  useLayoutEffect(() => {
    hideBreadcrumb(router)
      ? setBreadcrumbItems(generateBreadcrumb(router))
      : setBreadcrumbItems([]);
  }, [router.pathname]);

  return (
    <>
      {breadcrumbItems.length > 0 ? (
        <div className={`${styles.breadcrum} `}>
          <Stack spacing={2}>
            <Breadcrumbs
              separator={
                <Image src={'/images/icons/breadcrum.svg'} height={24} width={24} />
              }
              aria-label="breadcrumb"
              classes={{
                ol: styles.breadcrum_list,
                li: styles.breadcrum_item,
                separator: styles.breadcrum_separator,
              }}
            >
              last:
              {breadcrumbItems.map((item, index) => {
                if (item.label === '') {
                  return;
                  // return (
                  //   <Typography
                  //     key={item.id}
                  //     color="text.primary"
                  //     className="tw-text-base tw-text-black tw-leading-[30px] tw-font-[600]"
                  //   >
                  //     ...
                  //   </Typography>
                  // );
                }
                if (index === breadcrumbItems.length - 1) {
                  return (
                    <Typography key={item.id} color="text.primary">
                      {item.label}
                    </Typography>
                  );
                }

                return (
                  <Link key={item.id} href={item.href}>
                    <a>{item.label}</a>
                  </Link>
                );
              })}
            </Breadcrumbs>
          </Stack>
        </div>
      ) : null}
    </>
  );
}
