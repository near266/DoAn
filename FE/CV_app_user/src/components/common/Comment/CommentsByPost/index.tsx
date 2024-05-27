import { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';

import { formatServerDateToDurationString } from '@/helpers/date-helper';
import { Can } from '@/core';
import { EmojiLibrary } from '../EmojiLibrary';
import { UserNamed } from '../../../index';
import styles from './styles.module.scss';

const CommentsByPost = (props) => {
  const [commentsState, setCommentsState] = useState([]);
  const { me } = props.auth;

  useEffect(() => {
    if (props.comments) {
      const comments = JSON.parse(JSON.stringify(props.comments));

      comments.forEach((item) => {
        item.content = convert(item.content);
      });

      setCommentsState(comments);
    }

    return () => {};
  }, [props.comments]);

  const convert = (str) => {
    let mess = JSON.parse(JSON.stringify(str));

    // eslint-disable-next-line no-useless-escape
    const colonsRegex = new RegExp('(^|\\s)(:[a-zA-Z0-9-_+]+:(:skin-tone-[2-6]:)?)');
    const data = [];
    let match;
    // eslint-disable-next-line no-cond-assign
    while ((match = colonsRegex.exec(mess))) {
      const colons = match[2];
      const offset = match.index + match[1].length;
      const length = colons.length;
      if (offset !== 0) {
        data.push(mess.substring(0, match.index + 1));
      }

      data.push(<EmojiLibrary colon={colons} />);

      mess = mess.substring(offset + length);
    }
    data.push(mess);

    return data;
  };

  return (
    <div id={styles.comentsByPost}>
      {commentsState.map((item, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.item__header}>
            <div>
              <Link href={`/profile/${item.creator.username}`}>
                <a>
                  <img
                    className="avatar-user-general"
                    src={item.creator.avatar}
                    alt="avatar"
                  />
                </a>
              </Link>
            </div>
            <div className={styles.user}>
              <Link href={`/profile/${item.creator.username}`}>
                <a className={styles.user__name}>
                  <UserNamed user={item.creator} iconSize={12} />
                </a>
              </Link>
              <figcaption className={cx('figure-caption figure-time', styles.time)}>
                {formatServerDateToDurationString(item.created_at)}
              </figcaption>
            </div>
          </div>
          <span className={styles.content}>
            {item.content.map((itemContent, indexContent) => (
              <Fragment key={indexContent}>{itemContent}</Fragment>
            ))}
          </span>

          <Can perform="post_mod" orCondition={me.id === item.creator.id}>
            <div className={styles.control}>
              <span className={styles.control__action}>Edit</span>
              <span
                className={styles.control__action}
                onClick={() => props.onDeleteComment(item.id, index)}
              >
                Delete
              </span>
            </div>
          </Can>
        </div>
      ))}
    </div>
  );
};

CommentsByPost.propTypes = {
  comments: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

export default CommentsByPost;
