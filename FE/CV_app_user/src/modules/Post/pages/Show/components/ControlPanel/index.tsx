import Link from 'next/link';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { appLibrary } from '@/shared';
import { useSnackbar } from '@/shared/snackbar';
import { postService } from '../../../../shared';
import styles from './styles.module.scss';

const ControlPanel = ({ postSlug }) => {
  const router = useRouter();
  const snackbar = useSnackbar();

  const handDeletePost = async () => {
    const isConfirmed = await confirm('Bạn có muốn xóa bài viết không?');
    if (!isConfirmed) return;

    appLibrary.showloading();
    const res = await postService
      .delete(router.query.slug)
      .finally(() => appLibrary.hideloading());

    if (res?.code === 'SUCCESS') {
      snackbar.showMessage('Xóa bài viết thành công', 'success');
      router.push('/');
    }
  };

  return (
    <div>
      <Link href={`/posts/${postSlug}/edit`}>
        <a className={cx(styles.btnAction, 'btn btn-common')}>Sửa</a>
      </Link>
      <button
        type="submit"
        className={cx(styles.btnAction, 'btn btn-danger')}
        onClick={handDeletePost}
      >
        Xóa
      </button>
    </div>
  );
};

ControlPanel.propTypes = {
  postSlug: PropTypes.string.isRequired,
};

export default ControlPanel;
