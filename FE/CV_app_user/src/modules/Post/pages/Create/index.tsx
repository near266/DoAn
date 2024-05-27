import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';

import { IRootState } from '@/store';
import { appLibrary, FullContentLayout } from '@/shared';
import { FormHelper } from '@/shared/forms';
import { useSnackbar } from '@/shared/snackbar';
import { PostForm } from '../../models';
import { FormBuilder } from '../../components';
import { validationSchemaCreate, postService } from '../../shared';
import styles from './styles.module.scss';

const Create = () => {
  const snackbar = useSnackbar();
  const router = useRouter();
  const me = useSelector((state: IRootState) => state.auth.me);

  const postForm = useFormik<PostForm>({
    initialValues: new PostForm(),
    validationSchema: validationSchemaCreate,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(formValues: PostForm) {
    appLibrary.showloading();
    const res = await postService
      .create(formValues)
      .catch((errors) => {
        FormHelper.handleValidationErrors(postForm, errors);
        snackbar.showMessage('Vui lòng kiểm tra lại thông tin', 'error');
      })
      .finally(() => appLibrary.hideloading());

    if (res?.code === 'SUCCESS') {
      snackbar.showMessage('Bài viết đã được gửi phê duyệt', 'success');
      router.push(`/profile/${me.username}?tab=waitingApprove`);
    }
  }

  return (
    <FullContentLayout className={styles.page}>
      <Container maxWidth="md" className="tw-bg-white tw-rounded-[10px] tw-p-[30px]">
        <FormBuilder form={postForm} />
      </Container>
    </FullContentLayout>
  );
};

export default Create;
