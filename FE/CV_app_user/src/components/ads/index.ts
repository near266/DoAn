import dynamic from 'next/dynamic';

export const AdSense = dynamic(() => import('../ads/AdSense'), { ssr: false });
