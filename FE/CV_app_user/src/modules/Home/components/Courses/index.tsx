import cx from 'classnames';
import { useRef } from 'react';

import { ContainerLoading } from '@/components';
import CourseCard from '@/components/common/Cards/CourseCard';
import CutTomCarousel from '@/components/common/CarouselButton';
import styles from './styles.module.scss';
const scrollWidth = 300;

const dummyCourses = [
  {
    id: 1,
    imgUrl: '/images/homepage/youth-hero-desktop.png',
    title: 'Lelia Mendoza',
    duration: 1,
    slug: 'hoc-lap-trinh-co-ban',
    price: 981590,
    startCount: 4,
    registeredUser: 10,
  },
  {
    id: 2,
    imgUrl: '/images/homepage/youth-hero-desktop.png',
    title: 'Angel Ruiz',
    duration: 1,
    slug: 'hoc-lap-trinh-co-ban',
    price: 829509,
    startCount: 4,
    registeredUser: 10,
  },
  {
    id: 3,
    imgUrl: '/images/homepage/youth-hero-desktop.png',
    title: 'Connor Wright',
    duration: 1,
    slug: 'hoc-lap-trinh-co-ban',
    price: 435760,
    startCount: 4,
    registeredUser: 10,
  },
  {
    id: 4,
    imgUrl: '/images/homepage/youth-hero-desktop.png',
    title: 'Christine Dennis',
    duration: 1,
    slug: 'hoc-lap-trinh-co-ban',
    price: 968456,
    startCount: 4,
    registeredUser: 10,
  },
  {
    id: 5,
    imgUrl: '/images/homepage/youth-hero-desktop.png',
    title: 'Christine Dennis',
    duration: 1,
    slug: 'hoc-lap-trinh-co-ban',
    price: 968456,
    startCount: 4,
    registeredUser: 10,
  },
];
interface IProps {
  numberOfCourses?: number;
}
const Courses: React.FC<IProps> = (props: IProps) => {
  const scrollRef = useRef(null);

  const ListCourse = () => (
    <CutTomCarousel scrollWidth={scrollWidth} scrollRef={scrollRef}>
      <div
        ref={scrollRef}
        className={cx(
          'hide_scrollbar row !tw-mx-0  !tw-flex-nowrap !tw-overflow-x-scroll  tw-py-3 tw-snap-x'
        )}
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {dummyCourses.map((course, index) => (
          <CourseCard
            id={course.id}
            duration={course.duration}
            key={index}
            title={course.title}
            price={course.price}
            startCount={course.startCount}
            registeredUser={course.registeredUser}
            imgUrl={course.imgUrl}
            slug={course.slug}
          />
        ))}
      </div>
    </CutTomCarousel>
  );

  return (
    <section id="scroll" className={styles.courses}>
      <ContainerLoading loading={false}>
        {<ListCourse />}

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

export default Courses;
