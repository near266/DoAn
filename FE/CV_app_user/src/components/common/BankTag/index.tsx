import React from 'react';
import { BANK_LIST } from '@/shared/enums/bankEnum';
import styles from './style.module.scss';

export const BankTag = (props) => {
  const { id } = props;
  for (let i = 0; i < BANK_LIST.length; i++) {
    if (BANK_LIST[i].id === id) {
      return (
        <div className={`${styles['bank-tag']}`}>
          <img
            className={`${styles['bank-img']}`}
            src={BANK_LIST[i].logo}
            alt="bank-logo"
          />
        </div>
      );
    }
  }
};
