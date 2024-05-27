import { useContext } from 'react';
import cx from 'classnames';
import { difference } from 'lodash-es';

import AppContext from '../../context/AppContext';
import { ProfileModel } from '../../models/model';
import {
  MOVE_UP_BLOCKY,
  MOVE_DOWN_BLOCKY,
  HIDE_BLOCKY,
} from '../../hooks/usePageBuilders';
import { REMOVE_REFER_KEYS_FROM_BLOCKY } from '../../hooks/useProfileData';
import { BLOCKY_KEYS_MAP, BLOCKY_ARRAY_LIST } from '@/shared/enums';
import styles from './styles.module.scss';

const BlockyControl = (props) => {
  const { builders, dispatchBuilder, profileData, dispatchProfileData } =
    useContext(AppContext);
  const { keyType } = props;

  const internalHideBlocky = (keyType) => {
    dispatchBuilder({ type: HIDE_BLOCKY, keyType: keyType });
    dispatchProfileData({ type: REMOVE_REFER_KEYS_FROM_BLOCKY, keyType: keyType });
  };

  const showAllBlocky = () => {
    const profileDataClone = { ...profileData };
    const buildersClone: any = { ...builders };
    const defaultOrder = BLOCKY_ARRAY_LIST;
    const currentOrder = buildersClone.blocky_order;
    const hiddenItems = difference(defaultOrder, currentOrder);
    const profileClass = new ProfileModel();

    // set default key from model
    hiddenItems.forEach((hiddenItem) => {
      const keysRefers = BLOCKY_KEYS_MAP[hiddenItem];
      keysRefers.forEach((keysRefer) => {
        profileDataClone[keysRefer] = profileClass[keysRefer];
      });
    });

    // set all blocky to builder
    buildersClone.blocky_order = [...BLOCKY_ARRAY_LIST];
    dispatchBuilder({ payload: buildersClone });

    // set state
    dispatchProfileData({ payload: profileDataClone });
  };

  return (
    <div>
      <div
        className={cx(styles.controlItem, styles.utility)}
        title="Hiển thị tất cả mục"
        onClick={() => showAllBlocky()}
      >
        <i className="fas fa-bars"></i>
      </div>
      <div
        className={cx(styles.controlItem, styles.utility)}
        title="Chuyển lên"
        onClick={() => dispatchBuilder({ type: MOVE_UP_BLOCKY, keyType: keyType })}
      >
        <i className="fas fa-caret-up"></i>
      </div>
      <div
        className={cx(styles.controlItem, styles.utility)}
        title="Chuyển xuống"
        onClick={() => dispatchBuilder({ type: MOVE_DOWN_BLOCKY, keyType: keyType })}
      >
        <i className="fas fa-caret-down"></i>
      </div>
      <div
        className={cx(styles.controlItem, styles.hide, 'bg-danger')}
        title="Ẩn mục"
        onClick={() => internalHideBlocky(keyType)}
      >
        <i className="fas fa-folder-minus"></i> Ẩn mục
      </div>
    </div>
  );
};

export default BlockyControl;
