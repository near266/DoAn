import cx from 'classnames';
import { differenceInDays } from 'date-fns';

export class Helper {
  static emojiUrl = '/images/emoji/google-64.png';
}

export const activeClassname = (
  always: string,
  add: boolean,
  activeClass: string = 'active'
) => {
  return add ? cx(always, activeClass) : always;
};

export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

export const isDevelopment = () => {
  return process.env.NODE_ENV !== 'development';
};

export const isServer = () => {
  return typeof window === 'undefined';
};

export const isBrowser = () => {
  return !isServer();
};
export const numberWithCommas = (x) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
export const convertToSimplifiedVND = (number: number): number => {
  return number / 1000000;
};
export const calculateDateDiff = (timestamp: any) => {
  const currentDate = new Date();
  const targetDate = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

  const diffDays = differenceInDays(currentDate, targetDate);

  return Math.abs(diffDays);
};
