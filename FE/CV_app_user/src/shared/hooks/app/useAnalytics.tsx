import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Analytics } from '@/shared';

export const useAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    Analytics.initGA();
    if (!router.asPath.includes('?')) {
      Analytics.logPageView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Listen for page changes after a navigation or when the query changes
    router.events.on('routeChangeComplete', Analytics.logPageView);
    return () => {
      router.events.off('routeChangeComplete', Analytics.logPageView);
    };
  }, [router.events]);

  return true;
};
