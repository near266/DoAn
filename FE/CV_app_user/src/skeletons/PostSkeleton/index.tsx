import { Skeleton } from '@mui/material';

const animation = 'wave';

const PostSkeleton2 = () => (
  <div>
    <div className="tw-flex tw-mb-4">
      <div className="tw-mr-2">
        <Skeleton variant="circular" animation={animation} width={40} height={40} />
      </div>
      <div className="tw-shrink-0 tw-mt-1.5">
        <Skeleton className="tw-rounded-md" variant="text" width={88} height={18} />
        <Skeleton className="tw-rounded-md" variant="text" width={52} height={16} />
      </div>
    </div>

    <Skeleton className="tw-rounded-md" variant="text" width={410} height={16} />
    <Skeleton className="tw-rounded-md" variant="text" width={380} height={16} />
    <Skeleton className="tw-rounded-md" variant="text" width={178} height={16} />
  </div>
);

export default PostSkeleton2;
