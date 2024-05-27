import cx from 'classnames';

import styles from './styles.module.scss';

const Loading = (props) => {
  return (
    <div className={cx(styles.loading, props.size)}>
      <img
        src="/images/icons/sunny-loading.svg"
        alt="Loading..."
        style={{ width: `${props.width}px` || '130px' }}
      />
    </div>
  );
};

export default Loading;
