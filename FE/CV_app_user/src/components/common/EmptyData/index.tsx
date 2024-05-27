import styles from './styles.module.scss';

const EmptyData = (props) => {
  return <div className={styles.emptyData}>{props.message || 'Không có dữ liệu'}</div>;
};

export default EmptyData;
