import { useEffect, useState, Fragment } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { isEmpty, size } from 'lodash-es';

import { IRootState } from '@/store';
import { FullContentLayout } from '@/shared';
import { IPost, IUser } from '@/interfaces';
import { formatServerDate } from '@/helpers/date-helper';
import {
  SocialShare,
  FollowButton,
  LikeButton,
  BookmarkButton,
  TextEditedContent,
  Comment,
} from '@/components';
const ControlPanel = dynamic(() => import('./components/ControlPanel'), {
  ssr: false,
});
const UserNamed = dynamic(() => import('@/components/common/UserNamed'), {
  ssr: false,
});
import styles from './styles.module.scss';

const ADS_MINLENGTH_TO_DISPLAY = 5000;

interface IProps {
  post: IPost;
  author: IUser;
  isShowAction: boolean;
  followingUsersCount: number;
  authorPosts: IPost[];
  referencePosts: IPost[];
}

interface ISplitedContent {
  type: 'html' | 'ads';
  value: any;
}

const Show = ({
  post,
  author,
  isShowAction,
  followingUsersCount,
  authorPosts,
  referencePosts,
}: IProps) => {
  const me = useSelector((state: IRootState) => state.auth.me);
  const isFetched = useSelector((state: IRootState) => state.auth.isFetched);

  const [splitedContent, setSplitedContent] = useState<ISplitedContent[]>([]);

  useEffect(() => {
    if (!isDisplayAdsInContent(post.content)) {
      setSplitedContent([
        {
          type: 'html',
          value: post.content,
        },
      ]);
      return;
    }

    const listContetSplited = splitWithoutRemoveDelimiters(post.content, '<p');

    // Very small content
    if (size(listContetSplited) < 6) {
      setSplitedContent([
        {
          type: 'html',
          value: post.content,
        },
      ]);
      return;
    }

    const secondContent = [];
    const firstContent = [];
    const adsNeedIndex = Math.round(listContetSplited.length / 2);

    listContetSplited.forEach((item, index) => {
      if (index < adsNeedIndex - 1) {
        firstContent.push(item);
      } else {
        secondContent.push(item);
      }
    });

    const tranferedContent: ISplitedContent[] = [
      {
        type: 'html',
        value: firstContent.join(''),
      },
      {
        type: 'ads',
        value: (
          <div>
            {/* <AdSense
              adFormat="fluid"
              data-ad-layout="in-article"
              adSlot="4751581572"
              className={styles.adsInsideContent}
            /> */}
          </div>
        ),
      },
      {
        type: 'html',
        value: secondContent.join(''),
      },
    ];

    setSplitedContent(tranferedContent);
  }, [post.content]);

  const isDisplayAdsInContent = (postContent?: string): boolean => {
    if (isEmpty(postContent)) {
      return false;
    }

    if (postContent.length <= ADS_MINLENGTH_TO_DISPLAY) {
      return false;
    }

    return true;
  };

  const splitWithoutRemoveDelimiters = (str: string, delimiter: string): any[] => {
    // No solution for it
    const newStringReplaced = str.replace(/<p/gi, `___TEMP___${delimiter}`);
    const newString = newStringReplaced.split('___TEMP___');
    return newString;
  };

  return (
    <FullContentLayout className={styles.page}>
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div>
              {/* <AdSense adSlot="6856900542" className={styles.page__adsPost} /> */}
            </div>
            <Paper className={styles.postArea}>
              <div className={styles.action}>
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
              <div className={styles.uiHeader}>
                <h1 className={styles.uiHeader__title}>{post.name}</h1>
                <div className={styles.postTags}>
                  <ul className="list-inline" style={{ marginBottom: '12px' }}>
                    {post.tags &&
                      post.tags.split(',').map((item, index) => (
                        <li
                          key={index}
                          className={cx(styles.postTags__item, 'list-inline-item')}
                        >
                          <span className={cx(styles.postTags__link, 'text-xs-center')}>
                            {item}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
                {isShowAction && <ControlPanel postSlug={post.slug} />}
              </div>

              {/* Avatar */}
              {post.avatar && (
                <div className={styles.postAvatar}>
                  {/* TODOKOGAP: Add lazyload */}
                  <img className="lozad" src={post.avatar} alt={post.name} />
                </div>
              )}

              {/* Content */}
              <div className={styles.postContent}>
                {splitedContent.map((item, index) => (
                  <Fragment key={index}>
                    {item.type === 'html' && <TextEditedContent content={item.value} />}

                    {item.type === 'ads' && item.value}
                  </Fragment>
                ))}

                {/* <AdSense
                  adFormat="fluid"
                  data-ad-layout="in-article"
                  adSlot="4751581572"
                  className={styles.adsInsideContent}
                /> */}

                {/* Share post */}
                <SocialShare title={post.name} />
              </div>

              <div className={styles.appellateFoot}>
                <a
                  href="https://bit.ly/membershipfromweb"
                  target="_blank"
                  rel="noreferrer"
                >
                  Cùng Eztek thấu hiểu bản thân tại đây
                </a>
              </div>

              <div id="comment-box" className={styles.commentBox}>
                <div className="col-md-10">
                  <Comment postId={post.id} />
                </div>
              </div>
            </Paper>
          </div>
          <div className="col-lg-3">
            <div className={styles.rightContent}>
              {/* <div className={styles.banner}>
                <a
                  href="https://bit.ly/membershipfromweb"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/images/membership/banner.gif" alt="Membership" />
                </a>
              </div> */}

              {/* Author */}
              <Paper className={cx(styles.author, styles.box)}>
                <div className={styles.boxTitle}>Tác giả</div>
                <div className={styles.author__avatar}>
                  <img src={author.avatar} alt="Ảnh đại diện" />
                </div>
                <div className={styles.authorDetail}>
                  <Link href={`/profile/${author.username}`}>
                    <a className={cx('text-common', styles.authorDetail__name)}>
                      <UserNamed user={author} iconSize={14} />
                    </a>
                  </Link>
                  <div className={styles.authorDetail__separator}>-</div>
                  <div className={styles.authorDetail__more}>
                    <Link href={`/profile/${author.username}?tab=posts`}>
                      <a style={{ fontWeight: 600 }}>{author.posts_count}</a>
                    </Link>
                    &nbsp;
                    <span className={styles.authorDetail__textAfter}>bài viết</span>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <span style={{ fontWeight: 600 }}>{followingUsersCount}</span>
                    &nbsp;
                    <span className={styles.authorDetail__textAfter}>người theo dõi</span>
                  </div>
                </div>
                {isFetched && me.id !== author.id && (
                  <div className={styles.followBox}>
                    <FollowButton
                      followType="user"
                      isFollowed={author.isFollowed}
                      followId={author.id}
                    />
                  </div>
                )}
              </Paper>

              {/* Post same author */}
              <Paper className={cx(styles.authorPost, styles.box)}>
                <div className={styles.boxTitle}>Cùng tác giả</div>
                <div className={styles.otherPost}>
                  <ul className={styles.otherPost__list}>
                    {authorPosts.map((item, index) => (
                      <li key={index}>
                        <Link href={`/posts/${item.slug}`}>
                          <a>{item.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Paper>

              {/* Reference posts */}
              <Paper className={cx(styles.referencePost, styles.box)}>
                <div className={styles.boxTitle}>Bài viết liên quan</div>
                <div className={styles.otherPost}>
                  <ul className={styles.otherPost__list}>
                    {referencePosts.map((item, index) => (
                      <li key={index}>
                        <Link href={`/posts/${item.slug}`}>
                          <a>{item.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Paper>

              {/* <div style={{ marginBottom: '10px' }}>
                <AdSense adFormat="rectangle" adSlot="6848968161" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </FullContentLayout>
  );
};

Show.propTypes = {
  post: PropTypes.object.isRequired,
  isShowAction: PropTypes.bool,
  author: PropTypes.object.isRequired,
  followingUsersCount: PropTypes.number,
  authorPosts: PropTypes.array,
  referencePosts: PropTypes.array,
};

export default Show;
