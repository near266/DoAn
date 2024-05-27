import { FC, useEffect, CSSProperties } from 'react';
import cx from 'classnames';

import { isDevelopment } from '@/helpers';

declare const window: any;

interface IProps {
  adSlot: string;
  adFormat?: string;
  customStyles?: CSSProperties;
  className?: string;
  [x: string]: any;
}

const AdSense: FC<IProps> = ({ adSlot, adFormat, customStyles, className, ...rest }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }, []);

  if (isDevelopment()) {
    return <></>;
  }

  return (
    <ins
      {...rest}
      style={{
        ...customStyles,
        display: 'block',
      }}
      className={cx('adsbygoogle', className)}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CA_PUB}
      data-ad-slot={adSlot}
      data-ad-format={adFormat || 'auto'}
      data-full-width-responsive="true"
    />
  );
};

export default AdSense;
