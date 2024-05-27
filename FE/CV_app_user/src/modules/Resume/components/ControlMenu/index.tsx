import { useContext } from 'react';
import cx from 'classnames';

import AppContext from '../../context/AppContext';
import { activeClassname } from '@/helpers';
import { ColorItem } from './styled';
import { SET_COMMON_COLOR } from '../../hooks/usePageBuilders';
import styles from './styles.module.scss';

const ControlMenu = (props) => {
  const colorItems = ['#e8660e', '#28a745', '#e10053', '#30498f', '#6c757d'];
  const { builders, dispatchBuilder } = useContext(AppContext);

  return (
    <div className={styles.controls}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarColor}>
          <p className={styles.toolbarColor__title}>Màu chủ đạo</p>
          <ul className={styles.listItem}>
            {colorItems.map((item, index) => (
              <li key={index}>
                <ColorItem
                  className={activeClassname(
                    styles.listItem__action,
                    builders.common_color === item,
                    styles.listItem__actionActive
                  )}
                  color={item}
                  onClick={() => dispatchBuilder({ type: SET_COMMON_COLOR, color: item })}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={cx(styles.saveBtn, 'btn btn-common')}
        onClick={() => props.onSaveCV()}
      >
        <div className={styles.saveBtn__title}>Lưu CV</div>
        <i className="fas fa-save"></i>
      </div>
    </div>
  );
};

export default ControlMenu;
