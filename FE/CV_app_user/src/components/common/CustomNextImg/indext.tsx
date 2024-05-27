import { isEmpty, isString } from 'lodash-es';
import Image from 'next/image';
import { memo, useEffect, useState } from 'react';
/* Just a next Image but check invalid url then retur placeholder */
async function imageExists(image_url) {
  try {
    const response = await fetch(image_url);
    return response.ok;
  } catch (error) {
    return false;
  }
}
const PLACEHOLDER_IMAGE = '/images/homepage/youth-hero-desktop.png';
const CustomNextImg = (props: any) => {
  const { src } = props;
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    // if (isUrl(src)) {
    //   fetch(src, { method: 'HEAD' })
    //     .then((res) => res.ok && setIsValid(true))
    //     .catch((err) => false);
    //   return;
    // }
    // return setIsValid(true);
    if (isString(src)) {
      return setIsValid(true);
    }
  }, [src]);
  return isValid && src ? (
    <Image placeholder="blur" blurDataURL={PLACEHOLDER_IMAGE} src={src} {...props} />
  ) : (
    <Image
      {...props}
      layout="fill"
      placeholder="blur"
      blurDataURL={PLACEHOLDER_IMAGE}
      src={PLACEHOLDER_IMAGE}
    />
  );
};
export default memo(CustomNextImg);
