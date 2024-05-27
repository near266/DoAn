import ReactGA from 'react-ga';

import { isProduction } from '@/helpers';

export const initGA = () => {
  if (isProduction()) {
    ReactGA.initialize(process.env.NEXT_PUBLIC_ANALYTICS_ID);
  }
};

export const logPageView = () => {
  if (isProduction()) {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
