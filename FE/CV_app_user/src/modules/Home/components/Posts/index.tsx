import cx from 'classnames';
import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';
import { FC } from 'react';

import { BookmarkButton, ContainerLoading, LikeButton } from '@/components';
import CutTomCarousel from '@/components/common/CarouselButton';
import { formatServerDate } from '@/helpers';
import { IPost } from '@/interfaces';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';
import { TruncateLines } from 'react-truncate-lines';
import Events from '../Events';
import styles from './styles.module.scss';
import Image from 'next/image';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: '8px' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
interface IProps {
  posts: IPost[];
  isFetching: boolean;
}

export const ListPost = (props) => {
  const scrollRef = React.useRef(null);
  const { post: posts } = props;
  return (
    <CutTomCarousel scrollRef={scrollRef} scrollWidth={scrollWidth}>
      <div
        ref={scrollRef}
        className={cx(
          `${
            posts.length < 4 ? 'lg:!tw-justify-center' : ''
          } row hide_scrollbar !tw-flex-nowrap !tw-overflow-x-scroll `
        )}
        style={{
          scrollSnapType: 'x mandatory',
          scrollSnapPointsX: 'repeat(auto-fit)',
        }}
      >
        {posts.map((post, index) => (
          <article
            key={index}
            className={cx(
              'col-3  col-sm-6 col-12 col-md-4 col-lg-4 tw-mt-4',
              styles.listPost__article
            )}
          >
            <figure className={styles.postItem}>
              <div className={styles.block_image}>
                <a href={`/posts/${post.slug}`}>
                  <div className={cx('img-fluid tw-relative', styles.listPost__image)}>
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={post.avatar ?? '/images/homepage/youth-hero-desktop.png'}
                      alt={post.avatar}
                    />
                  </div>
                </a>
              </div>
              <div className={styles.block_content}>
                <div className={styles.postItem__subContent}>
                  <Link href={`/posts/${post.slug}`}>
                    <h4 className="figure-title">
                      <TruncateLines
                        lines={3}
                        ellipsis={<Link href={`/posts/${post.slug}`}>...Đọc thêm</Link>}
                      >
                        {post.name}
                      </TruncateLines>
                    </h4>
                  </Link>
                  <figcaption className={cx('figure-caption', styles.listPost__time)}>
                    {post.created_at}
                  </figcaption>
                  <figcaption
                    className={`${styles.figure_caption}`}
                    title="{{ $post->description }}"
                  >
                    <TruncateLines
                      lines={4}
                      ellipsis={<Link href={`/posts/${post.slug}`}>...Đọc thêm</Link>}
                    >
                      {post.description}
                    </TruncateLines>
                  </figcaption>
                </div>
                <div className="action">
                  <div className={styles.card_footer}>
                    <div className={styles.action__time}>
                      {formatServerDate(post.created_at, 'dd/MM/yyyy')}
                    </div>
                    <div className={styles.actionInfo}>
                      <div className={styles.actionInfo__item}>
                        <LikeButton
                          textSize="14px"
                          liked={post.liked.length}
                          likeCount={post.likes_count}
                          postId={post.id}
                        />
                      </div>
                      <div className={styles.actionInfo__item}>
                        <i className="bi bi-eye"></i>
                        <span className={styles.actionInfo__iconLabel}>
                          {post.view_number.toLocaleString()}
                        </span>
                      </div>
                      <div className={styles.actionInfo__item}>
                        <BookmarkButton bookmarked={post.bookmarked} postId={post.id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </article>
        ))}
      </div>
    </CutTomCarousel>
  );
};

const EmptyPost = () => {
  return <div className={styles.emptyPost}>Chưa có bài biết nổi bật</div>;
};
const scrollWidth = 300;
const Posts: FC<IProps> = ({ posts, isFetching }) => {
  const [value, setValue] = useState(0);
  const scrollRef = React.useRef(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <section id="scroll" className={styles.posts}>
      <div className={`${styles.bg_wrapper}`}></div>

      <div className="container  md:tw-pt-[1rem] tw-pt-10">
        <div className={`${styles.title} `}>
          <p className="section-title">Hoạt động nổi bật</p>
        </div>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Hoạt động nổi bật"
              centered
              className="tw-flex tw-gap-8"
              classes={{
                indicator: styles.indicator,
                flexContainer: styles.tabs__flexContainer,
              }}
            >
              <Tab
                label="Bài viết "
                classes={{ selected: styles.tabs__selected }}
                color="white"
                className={`${styles.tabs} `}
              />
              {/* &nbsp; &nbsp; */}
              <Tab
                label=" Sự kiện"
                classes={{ selected: styles.tabs__selected }}
                color="white"
                className={`${styles.tabs} `}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {isEmpty(posts) ? <EmptyPost /> : <ListPost post={posts} />}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className=" tw-mt-4">
              <Events />
            </div>
          </TabPanel>
        </Box>
        <ContainerLoading loading={isFetching}>
          <a href="/post">
            <div className="d-flex tw-mb-9 tw-text-center tw-justify-center tw-items-center">
              <span className="tw-text-center tw-text-[#403ECC] tw-text-xl">
                Xem tất cả
              </span>
              <img src="/images/icons/right_arrow.svg" alt="" />
            </div>
          </a>
        </ContainerLoading>
      </div>
    </section>
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
