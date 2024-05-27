import cx from 'classnames';
import PropTypes from 'prop-types';
import { useRef } from 'react';

import { ContainerLoading } from '@/components';
import CutTomCarousel from '@/components/common/CarouselButton';
import { formatServerDate } from '@/helpers';
import Link from 'next/link';
import { TruncateLines } from 'react-truncate-lines';
import styles from './styles.module.scss';
import { EventEmitter } from 'stream';
import EventCard from '@/components/common/Cards/EventCard';

const dummyCourses = [
  {
    id: 1,
    imgUrl: '/images/homepage/youth-hero-desktop.png',
    title: 'Học lập trình cơ bản',
    description: 'Thu 10.00 Dong Da, Ha Noi',
    createdAt: '2020-01-01',
    slug: 'hoc-lap-trinh-co-ban',
    registeredUser: [
      {
        name: 'Nguyễn Văn A',
        avatar: '/images/homepage/youth-hero-desktop.png',
      },
      {
        name: 'Nguyễn Văn A',
        avatar: '/images/homepage/youth-hero-desktop.png',
      },
      {
        name: 'Nguyễn Văn A',
        avatar: '/images/homepage/youth-hero-desktop.png',
      },
      {
        name: 'Nguyễn Văn A',
        avatar: '/images/homepage/youth-hero-desktop.png',
      },
      {
        name: 'Nguyễn Văn A',
        avatar: '/images/homepage/youth-hero-desktop.png',
      },
      {
        name: 'Nguyễn Văn A',
        avatar: '/images/homepage/youth-hero-desktop.png',
      },
      {
        name: 'Nguyễn Văn A',
        avatar: '/images/homepage/youth-hero-desktop.png',
      },
      {
        name: 'Nguyễn Văn A',
        avatar: '/images/homepage/youth-hero-desktop.png',
      },
      {
        name: 'Nguyễn Văn A',
        avatar: '/images/homepage/youth-hero-desktop.png',
      },
    ],
  },
  {
    id: 2,
    imgUrl: '/images/homepage/youth-hero-desktop.png',
    title: 'Học lập trình cơ bản',
    description: 'Thu 10.00 Dong Da, Ha Noi',
    createdAt: '2020-10-11',
    slug: 'hoc-lap-trinh-co-ban',
    registeredUser: [
      {
        name: 'Nguyễn Văn A',
        avatar: '/images/homepage/youth-hero-desktop.png',
      },
    ],
  },
  {
    id: 3,
    imgUrl: '/images/homepage/youth-hero-desktop.png',
    title: 'Học lập trình cơ bản',
    description: 'Thu 10.00 Dong Da, Ha Noi',
    createdAt: '2020-04-12',
    slug: 'hoc-lap-trinh-co-ban',
    registeredUser: [
      {
        name: 'Nguyễn Văn A',
        avatar: '/images/homepage/youth-hero-desktop.png',
      },
    ],
  },
  {
    id: 4,
    imgUrl: '/images/homepage/youth-hero-desktop.png',
    title: 'Học lập trình cơ bản',
    description: 'Thu 10.00 Dong Da, Ha Noi',
    createdAt: '2020-05-01',
    slug: 'hoc-lap-trinh-co-ban',
    registeredUser: [
      {
        name: 'Nguyễn Văn A',
        avatar: '/images/homepage/youth-hero-desktop.png',
      },
    ],
  },
];
const SCROLL_WIDTH = 300;
const Events = () => {
  const scrollRef = useRef(null);
  const ListEvent = () => (
    <CutTomCarousel scrollRef={scrollRef} scrollWidth={SCROLL_WIDTH}>
      <div
        ref={scrollRef}
        className={cx(
          `${
            dummyCourses.length < 4 ? 'lg:!tw-justify-center ' : ''
          } row hide_scrollbar !tw-flex-nowrap !tw-overflow-x-scroll `
        )}
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {dummyCourses.map((course, index) => (
          <EventCard
            id={course.id}
            createdAt={course.createdAt}
            description={course.description}
            imgUrl={course.imgUrl}
            registeredUser={course.registeredUser}
            slug={course.slug}
            title={course.title}
            key={course.id}
          />
        ))}
      </div>
    </CutTomCarousel>
  );

  return (
    <section id="scroll" className={styles.Events}>
      <ContainerLoading loading={false}>
        {<ListEvent />}

        {/* <a href="/post">
            <div className="d-flex tw-my-9 tw-text-center tw-justify-center tw-items-center">
              <span className="tw-text-center tw-text-[#403ECC] tw-text-xl">
                Xem tất cả
              </span>
              <img src="/images/icons/right_arrow.svg" alt="" />
            </div>
          </a> */}
      </ContainerLoading>
    </section>
  );
};

Events.propTypes = {
  events: PropTypes.array.isRequired,
};

export default Events;
