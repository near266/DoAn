import cx from 'classnames';

import styles from './styles.module.scss';

const Slogan = (props) => {
  return (
    <section
      className={cx(
        styles.slogan,
        'container d-flex align-items-center justify-content-center'
      )}
    >
      <div className={styles.slogan__content}>Hoàn thiện bản thân thông qua thực tế</div>
      <div className={styles.mark}>
        <div className={styles.mark__left}></div>
        <div className={styles.mark__right}></div>
      </div>
    </section>
  );
};

export default Slogan;
