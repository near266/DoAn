import { FC } from 'react';
import { useSelector } from 'react-redux';
import { isString, isEmpty } from 'lodash-es';

import { IRootState } from '@/store';

interface IProps {
  perform: string | string[];
  orCondition?: boolean;
  children: any;
}

const Can: FC<IProps> = ({ children, perform, orCondition }) => {
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);
  const me = useSelector((state: IRootState) => state.auth.me);

  const isPerformed = () => {
    if (!isAuthenticated) {
      return false;
    }

    if (orCondition) {
      return true;
    }

    if (isEmpty(me.role_codes)) {
      return false;
    }

    if (isString(perform)) {
      return me.role_codes.includes(perform);
    }

    return false;
  };

  const View = isPerformed() ? children : null;

  return View;
};

export default Can;
