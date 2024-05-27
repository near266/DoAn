import cx from 'classnames';

import { formatServerDate } from '@/helpers';
import Link from 'next/link';
import { TruncateLines } from 'react-truncate-lines';
import styles from './styles.module.scss';

export interface IEventCardProps {
  id: number;
  imgUrl: string;
  title: string;
  description: string;
  createdAt: string;
  slug: string;
  registeredUser: {
    name: string;
    avatar: string;
  }[];
}

const EventCard: React.FC<IEventCardProps> = (props: IEventCardProps) => {
  const { id, imgUrl, title, description, createdAt, slug, registeredUser } = props;
  return (
    <article
      key={id}
      className={cx('col-3  col-sm-6 col-12 col-md-4 col-lg-4', styles.event__article)}
    >
      <figure className={styles.eventItem}>
        <div className={styles.block_image}>
          <a href={`/posts/${slug}`}>
            <img
              src={imgUrl ?? '/images/homepage/youth-hero-desktop.png'}
              className={cx('img-fluid', styles.event__image)}
              alt={imgUrl}
            />
          </a>
        </div>
        <div className={styles.block_content}>
          <div className={styles.postItem__subContent}>
            <div className="d-flex tw-gap-[16px]">
              <figcaption className={cx('figure-caption', styles.event__time)}>
                {/* month */}
                <span className={styles.event__time__month}>
                  {formatServerDate(createdAt, 'MMM')}
                </span>

                {/* date */}
                <span className={styles.event__time__date}>
                  {formatServerDate(createdAt, 'dd')}
                </span>
              </figcaption>
              <div className="d-flex tw-flex-col">
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
                <figcaption
                  className={`${styles.figure_caption}`}
                  title="{{ $post->description }}"
                >
                  <TruncateLines
                    lines={4}
                    ellipsis={<Link href={`/posts/${slug}`}>...Đọc thêm</Link>}
                  >
                    {description}
                  </TruncateLines>
                </figcaption>
                <div className="action tw-mt-3">
                  {/* circle avatar */}
                  <div className="d-flex tw-gap-[10px] tw-w-full tw-justify-start tw-items-center">
                    {registeredUser.map((user, index) => {
                      const addtionUser = registeredUser.length - 4;
                      if (index < 4) {
                        return (
                          <div
                            key={index}
                            className="tw-h-[32px] tw-w-[32px] tw-rounded-full tw-overflow-hidden"
                          >
                            <img
                              src={
                                user.avatar ?? '/images/homepage/youth-hero-desktop.png'
                              }
                              className="tw-h-full"
                              alt={user.name}
                            />
                          </div>
                        );
                      }
                      if (index == 5) {
                        return (
                          <div
                            key={index}
                            className="tw-h-[32px] tw-w-[32px] tw-rounded-full tw-overflow-hidden tw-border-solid tw-border-[1px] tw-border-[#E2E2EA]
                          tw-text-[12px] tw-text-[#696974] d-flex tw-justify-center tw-items-center"
                          >
                            +{addtionUser}
                          </div>
                        );
                      }
                    })}
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
export default EventCard;
