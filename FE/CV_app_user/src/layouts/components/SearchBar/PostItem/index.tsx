import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const PostItem = ({ post }) => {
  return (
    <div key={post.id} className={styles.postItem}>
      <div className={styles.postItem__avatar}>
        {post.avatar && (
          <Link href={`/posts/${post.slug}`}>
            <a>
              <img src={post.avatar} alt="Ảnh bài viết" />
            </a>
          </Link>
        )}
      </div>
      <div className={styles.info}>
        <Link href={`/posts/${post.slug}`}>
          <a>
            <p className={styles.info__name}>{post.name}</p>
          </a>
        </Link>
        <div className={styles.info__author}>
          <Link href={`/profile/${post.creator?.username}`}>
            <a>Tác giả: {post.creator?.name}</a>
          </Link>
        </div>
        <span className={styles.info__view}>
          {post.view_number.toLocaleString()} lượt xem
        </span>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostItem;
