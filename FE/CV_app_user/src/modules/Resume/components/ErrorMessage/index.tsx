import cx from 'classnames';

import styles from './styles.module.scss';

const ErrorMessage = (props) => {
  const { messages } = props;

  return (
    <div className={styles.error}>
      {messages && Object.keys(messages).length > 0 && (
        <div className={cx('alert alert-danger', styles.error__alert)}>
          <ul className={styles.error__list}>
            {Object.keys(messages).map((key, index) => (
              <li key={index} className="text-danger">
                {messages[key][0]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
