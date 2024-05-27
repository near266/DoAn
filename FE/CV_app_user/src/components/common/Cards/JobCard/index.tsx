import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';
import { TruncateLines } from 'react-truncate-lines';
import styles from './styles.module.scss';
import { JobInfoEnum } from '@/modules/User/shared/enums';

export interface IJobCardProps {
  id: string | number;
  title: string;
  description: string;
  updateAt: string;
  slug: string;
  imgUrl: string;
  location: string;
  workTime: string;
  salary?: string;
  lg?: number;
  md?: number;
  sm?: number;
  defaultSize?: number;
  className?: string;
}

const JobCard: React.FC<IJobCardProps> = (props: IJobCardProps) => {
  const {
    id,
    title,
    description,
    updateAt,
    slug,
    imgUrl,
    location,
    workTime,
    salary,
    sm,
    md,
    lg,
    defaultSize,
    className,
  } = props;

  return (
    <Link href={`/Post?id=${id}`} passHref>
      <div
        key={id}
        className={cx(
          `col-${defaultSize ?? 12} col-sm-${sm ?? 6} col-md-${md ?? 4} col-lg-${
            lg ?? 3
          } tw-mb-8 tw-cursor-pointer`,
          styles.card_container,
          className
        )}
      >
        <div className={styles.card_wrapper}>
          <div className={styles['card_item']}>
            <div className={styles['card_header']}>
              <div className={styles['card_header__image']}>
                {/* <Image src={imgUrl} alt={title} layout="fill" /> */}

                <img
                  src={imgUrl || '/images/homepage/youth-hero-desktop.png'}
                  alt={title}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <p className="tw-cursor-pointer">...</p>
            </div>
            <div className={styles['card_body']}>
              <div className={styles['card_body__title']}>
                <Link href={`/Post?id=${id}`}>
                  <a>{title}</a>
                </Link>
              </div>
              <div className={styles['card_body']}>
                <div>
                  <p className={styles['card_body__description']}>
                    {
                      <TruncateLines
                        lines={3}
                        ellipsis={<Link href={`/Post?id=${id}`}>...Đọc thêm</Link>}
                      >
                        {description}
                      </TruncateLines>
                    }
                  </p>
                  <div className={styles['card_body__location']}>
                    <p>{location}</p>
                    <div className="tw-flex tw-justify-center tw-items-center">
                      <div className="tw-relative tw-w-6 tw-h-6">
                        <Image
                          src="/images/icons/attachment.svg"
                          layout="fill"
                          alt="location"
                        />
                      </div>
                      &nbsp; <span className="tw-text-base tw-text-[#92929D]">3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['card_footer']}>
              <div className={styles['card_footer__updateAt']}>
                <p>{updateAt}</p>
              </div>
              <div className={styles['card_footer__time']}>
                {JobInfoEnum.type_of_job.map((item) => {
                  if (item.value.toString() === workTime.toString()) {
                    return <p key={item.value}> {item.label}</p>;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default JobCard;
