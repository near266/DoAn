import dynamic from 'next/dynamic';

export const TextEditor = dynamic(() => import('./TextEditor'), { ssr: false });
export const SocialShare = dynamic(() => import('./SocialShare'), { ssr: false });
export const FollowButton = dynamic(() => import('./FollowButton'), {
  ssr: false,
});
export const LikeButton = dynamic(() => import('./LikeButton'), { ssr: false });
export const BookmarkButton = dynamic(() => import('./BookmarkButton'), {
  ssr: false,
});
export const Comment = dynamic(() => import('./Comment'), {
  ssr: false,
});
export * from './PopularPost';
export { default as EmptyData } from './EmptyData';
export { default as UserNamed } from './UserNamed';
export { default as ContainerLoading } from './ContainerLoading';
export { default as RenderWithCondition } from './RenderWithCondition';
export { default as CustomDropdown } from './CustomDropdown';
export { default as TextEditedContent } from './TextEditedContent';
