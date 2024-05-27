import { FC, useState } from 'react';
import { Paper, Button } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import { appLibrary, authService } from '@/shared';
import { Form, PasswordInput, FormHelper } from '@/shared/forms';
import { useSnackbar } from '@/shared/snackbar';
import { validationSchema } from './validationSchema';
import { ChangePasswordForm } from '../../models';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { domainToASCII } from 'url';

const ChangePassword: FC<any> = () => {
  const snackbar = useSnackbar();
  const router = useRouter();
  const { loading, data, succeeded } = useSelector((state: any) => state.login);
  const [initValue, SetInit] = useState<any>({
    userName: data.userName,
    oldPass: '',
    password: '',
    confirmPassword: '',
  });

  const myForm = useFormik<ChangePasswordForm>({
    initialValues: initValue,
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  async function handleSubmit(formValues: any) {
    appLibrary.showloading();
    console.log(myForm.values);

    const res = await authService
      .changePassword(myForm.values)
      .catch((errors) => {
        FormHelper.handleValidationErrors(myForm, errors);
        snackbar.showMessage('Có lỗi, vui lòng kiểm tra lại thông tin', 'error');
      })
      .finally(() => appLibrary.hideloading());

    snackbar.showMessage('Thay đổi mật khẩu thành công', 'success');
    router.push('/');
  }

  return (
    <Paper className={styles.box}>
      <div className={styles.box__title}>Thay đổi mật khẩu</div>
      <Form initForm={myForm} onSubmit={myForm.handleSubmit}>
        <div className={styles.inputField}>
          <PasswordInput required name="oldPass" label="Mật khẩu hiện tại" />
        </div>

        <div className={styles.inputField}>
          <PasswordInput required name="password" label="Mật khẩu mới" />
        </div>

        <div className={styles.inputField}>
          <PasswordInput required name="confirmPassword" label="Nhập lại mật khẩu mới" />
        </div>

        <div className={styles.submitArea}>
          <Button
            type="submit"
            className={styles.submitArea__button}
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Thay đổi
          </Button>
        </div>
      </Form>
    </Paper>
  );
};

export default ChangePassword;
