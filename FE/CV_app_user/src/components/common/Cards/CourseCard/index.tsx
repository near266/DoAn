import cx from 'classnames';

import { Button } from '@mui/material';
import Link from 'next/link';
import { TruncateLines } from 'react-truncate-lines';
import styles from './styles.module.scss';
import Image from 'next/image';
import CustomNextImg from '../../CustomNextImg/indext';

export interface ICourseCardProps {
  id: string | number;
  title: string;
  duration: number;
  slug: string;
  registeredUser: number;
  imgUrl: string;
  startCount: number;
  price: number;
  lg?: number;
  md?: number;
  sm?: number;
  defaultSize?: number;
}

const CourseCard: React.FC<ICourseCardProps> = (props: ICourseCardProps) => {
  const {
    id,
    title,
    duration,
    slug,
    registeredUser,
    imgUrl,
    startCount,
    price,
    sm,
    md,
    lg,
    defaultSize,
  } = props;
  return (
    <article
      key={id}
      className={cx(
        `col-${defaultSize ?? 12} col-sm-${sm ?? 6} col-md-${md ?? 4} col-lg-${
          lg ?? 3
        } tw-mb-8 `,
        styles.course__article
      )}
    >
      <figure className={styles.courseItem}>
        <div className={styles.block_image}>
          <CustomNextImg
            src={imgUrl}
            className={cx('img-fluid', styles.course__image)}
            alt={slug}
            layout="fill"
          />
        </div>
        <div className={styles.block_content}>
          <div className={styles.postItem__subContent}>
            <div className="d-flex tw-gap-[16px] tw-flex-col tw-w-full ">
              <Link href={`/posts/${slug}`}>
                <h4 className="figure-title">
                  <TruncateLines
                    lines={3}
                    ellipsis={<Link href={`/posts/${slug}`}>...Đọc thêm</Link>}
                  >
                    {title}
                  </TruncateLines>
                </h4>
              </Link>

              <div>
                <figcaption
                  className={`${styles.figure_caption} tw-flex tw-justify-between tw-items-center`}
                  title="{{ $post->description }}"
                >
                  <div className="d-flex tw-gap-4">
                    <span className="tw-font-[400] !tw-text-[#44444F] tw-text-base">
                      <img
                        src="/images/icons/user.svg"
                        alt=""
                        className="  tw-mb-[3px] tw-mr-[4px]"
                      />
                      {registeredUser}
                    </span>
                    <span className="tw-font-[400] !tw-text-[#44444F] tw-text-base">
                      <img
                        src="/images/icons/course_duration.svg"
                        alt=""
                        className="  tw-mb-[3px] tw-mr-[4px]"
                      />
                      {duration}h
                    </span>
                  </div>
                  <span>
                    {Array.from({ length: 5 }).map((_, index) => {
                      if (index < startCount) {
                        return <img src="/images/icons/gold_star.svg" alt="" />;
                      }
                      return <img src="/images/icons/star_empty.svg" alt="" />;
                    })}
                  </span>
                </figcaption>
                <div className="action tw-mt-4">
                  <div
                    className={cx(
                      'd-flex justify-content-between align-items-center',
                      styles.footerBox,
                      styles.assessment__box
                    )}
                  >
                    <div>
                      <Button
                        className={`${''}!tw-normal-case	 tw-w-full tw-bg-[#403ECC] tw-text-white tw-text-base tw-rounded-[10px] hover:tw-bg-white hover:tw-text-[#403ECC] tw-border-[1px] tw-border-solid tw-border-[#403ECC] `}
                        onClick={() => {}}
                      >
                        Học thử
                      </Button>
                    </div>
                    <div>
                      <span
                        className={`${styles.course__price} tw-text-[#111033] tw-text-sm`}
                      >
                        <img
                          src="/images/icons/price_tag.svg"
                          alt=""
                          className="tw-mb-[3px] tw-mr-[4px]"
                        />
                        {price} đ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </figure>
    </article>
  );
};
export default CourseCard;
