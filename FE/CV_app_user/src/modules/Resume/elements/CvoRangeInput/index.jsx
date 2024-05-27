import { useContext } from 'react';

import AppContext from '../../context/AppContext';
import { HANDLE_INPUT_CHANGE } from '../../hooks/useProfileData';
import styles from './styles.module.scss';

const CvoRangeInput = (props) => {
  const inputValue = props.value || 0;
  const { builders } = useContext(AppContext);
  const { dispatchProfileData } = useContext(AppContext);

  return (
    <div>
      <input
        className={styles.cvRangeInput}
        type="range"
        value={inputValue}
        min="0"
        max="100"
        onChange={(e) => {
          dispatchProfileData({
            type: HANDLE_INPUT_CHANGE,
            inputType: 'rawInput',
            name: props.name,
            evt: { ...e },
          });
        }}
        style={{
          '--common-color': builders.common_color,
        }}
      />
    </div>
  );
};

export default CvoRangeInput;
