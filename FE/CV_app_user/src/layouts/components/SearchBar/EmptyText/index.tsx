import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const EmptyText = (props) => {
  return (
    <div className={styles.emptyText}>
      <div>
        {props.searchValue ? (
          'Không tìm thấy bài viết phù hợp'
        ) : (
          <>
            <div className={styles.emptyText__suggestion}>
              Nhập tên bài viết để tìm kiếm
            </div>
            <div className={styles.emptyText__tip}>
              <strong>Pro tip:</strong> Bắt đầu bằng&nbsp;
              <span className={styles.emptyText__tipKey}>@</span> để tìm bài viết theo tên
              tác giả
            </div>
          </>
        )}
      </div>
    </div>
  );
};

EmptyText.propTypes = {
  searchValue: PropTypes.string,
};

export default EmptyText;
