import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Container } from '@mui/material';

import { IPost } from '@/interfaces';
import { appLibrary } from '@/shared';
import { FormHelper } from '@/shared/forms';
import { useSnackbar } from '@/shared/snackbar';
import { PostForm } from '../../models';
import { FormBuilder } from '../../components';
import { validationSchemaCreate, postService } from '../../shared';
import styles from './styles.module.scss';

interface IProps {
  post: IPost;
}

const Edit = ({ post }: IProps) => {
  const snackbar = useSnackbar();

  const [rawState, setRawState] = useState<IPost>({});
  const postForm = useFormik<PostForm>({
    initialValues: new PostForm(),
    validationSchema: validationSchemaCreate,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const transformer = new PostForm(post);
    setRawState(post);
    postForm.setValues(transformer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.id]);

  async function handleSubmit(formValues: PostForm) {
    appLibrary.showloading();
    const res = await postService
      .update(post.id, formValues)
      .catch((errors) => {
        FormHelper.handleValidationErrors(postForm, errors);
        snackbar.showMessage('Vui lòng kiểm tra lại thông tin', 'error');
      })
      .finally(() => appLibrary.hideloading());

    if (res?.code === 'SUCCESS') {
      snackbar.showMessage('Cập nhật bài viết thành công', 'success');
    }
  }

  return (
    <section className={styles.page}>
      <Container maxWidth="md">
        <FormBuilder rawState={rawState} form={postForm} />
      </Container>
    </section>
  );
};

export default Edit;
