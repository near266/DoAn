import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

import styles from './styles.module.scss';

const SocialShare = ({ title }) => {
  return (
    <div className={styles.share}>
      {/* <i className="fas fa-share-alt"></i> */}
      <FacebookShareButton
        className={styles.socialButton}
        url={location.href}
        hashtag="#youthplus_share"
      >
        <FacebookIcon className={styles.socialButton__icon} size={28} />
      </FacebookShareButton>

      <TwitterShareButton
        className={styles.socialButton}
        url={location.href}
        title={title}
      >
        <TwitterIcon className={styles.socialButton__icon} size={28} />
      </TwitterShareButton>

      <LinkedinShareButton title={title} url={location.href}>
        <LinkedinIcon className={styles.socialButton__icon} size={28} />
      </LinkedinShareButton>
    </div>
  );
};

SocialShare.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SocialShare;
