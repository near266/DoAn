import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { appLibrary, Common } from '@/shared/utils';

// show progres when change route
NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 500,
  showSpinner: false,
});

export const useNProgress = () => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      appLibrary.showloading();
      NProgress.start();
    });

    router.events.on('routeChangeComplete', () => {
      NProgress.done();
      appLibrary.hideloading();
    });
    router.events.on('routeChangeError', () => {
      NProgress.done();
      appLibrary.hideloading();
    });
  }, [router.events]);

  return true;
};
