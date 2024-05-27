import { useContext } from 'react';

import AppContext from '../../context/AppContext';
import { CLONE_FIELD, REMOVE_FIELD } from '../../hooks/useProfileData';
import styles from './styles.module.scss';

const FieldControl = (props) => {
  const { dispatchProfileData } = useContext(AppContext);
  const { objectKey, fieldIndex } = props;

  return (
    <div className={styles.fieldControls}>
      <div
        className={styles.fieldControls__clone}
        title="Thêm"
        onClick={() =>
          dispatchProfileData({
            type: CLONE_FIELD,
            objectKey: objectKey,
            fieldIndex: fieldIndex,
          })
        }
      >
        <i className="fas fa-plus"></i>
      </div>
      <div
        className={styles.fieldControls__remove}
        title="Xóa"
        onClick={() =>
          dispatchProfileData({
            type: REMOVE_FIELD,
            objectKey: objectKey,
            fieldIndex: fieldIndex,
          })
        }
      >
        <i className="fas fa-trash-alt"></i>
      </div>
    </div>
  );
};

export default FieldControl;
