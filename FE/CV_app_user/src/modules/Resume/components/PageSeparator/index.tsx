import styles from './styles.module.scss';

const PageSeparator = () => {
  return (
    <>
      <div className={styles.textView}>
        <span>Break page</span>
        <div className={styles.textView__separator}></div>
      </div>
    </>
  );
};

export default PageSeparator;
