import dynamic from 'next/dynamic';

export * from './helpers';

export const Auth = dynamic(() => import('./Auth'), {
  ssr: false,
});

export const Can = dynamic(() => import('./Can'), {
  ssr: false,
});
