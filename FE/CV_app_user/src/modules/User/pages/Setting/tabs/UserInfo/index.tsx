import { FC, useEffect, useState } from 'react';
import { Paper, Button } from '@mui/material';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import { appLibrary, authService } from '@/shared';
import { Form, TextInput, FileUpload, FormHelper } from '@/shared/forms';
import { useSnackbar } from '@/shared/snackbar';
import { IRootState, setAuthUser } from '@/store';
import { validationSchema } from './validationSchema';
import { SettingForm } from '../../models';
import styles from './styles.module.scss';
import axios from 'axios';

const UserInfo: FC<any> = () => {
  const user = useSelector((state: any) => state.login.data);
  const [UserDefault, SetUser] = useState<any>();
  const [initValue, SetInit] = useState<any>({});

  // Chú ý thay đổi kiểu dữ liệu
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const getUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/UserInfo/auth/me?id=${user.id}`
      );
      console.log(res.data);
      const init = {
        id: res.data.id,
        name: res.data.name,
        address: 'dasdas',
        email: user.email,
        information: res.data.information,
        phone: res.data.phone,
        avatar: res.data.avatar,
      };
      SetInit(init);
      SetUser(res.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const settingForm = useFormik<any>({
    initialValues: initValue, // Sử dụng giá trị mặc định nếu UserDefault chưa có
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true, // Thêm dòng này để form cập nhật initialValues khi UserDefault thay đổi
  });

  async function handleSubmit(initValue: any) {
    appLibrary.showloading();
    console.log(settingForm.values);

    const res = await authService
      .updateMeInfo(settingForm.values)
      .catch((errors) => {
        FormHelper.handleValidationErrors(settingForm, errors);
        snackbar.showMessage('Có lỗi, vui lòng kiểm tra lại thông tin', 'error');
      })
      .finally(() => appLibrary.hideloading());

    snackbar.showMessage('Cập nhật thông tin thành công', 'success');

    appLibrary.hideloading();
  }

  return (
    <Paper className={styles.box}>
      <div className={styles.box__title}>Thông tin cá nhân</div>
      <Form initForm={settingForm} onSubmit={settingForm.handleSubmit}>
        <p className="pl-3"> Tên đầy đủ</p>

        <TextInput required name="name" label="" className={styles.inputField} />
        <p className="pl-3"> Địa chỉ</p>

        <TextInput required name="address" label="" className={styles.inputField} />
        <p className="pl-3"> Email</p>
        <TextInput required disabled name="email" className={styles.inputField} />
        <p className="pl-3">Số điện thoại</p>

        <TextInput required name="phone" label="" className={styles.inputField} />
        <p className="pl-3"> Giới thiệu bản thân</p>

        <TextInput multiline rows={4} name="information" className={styles.inputField} />

        <FileUpload
          uploadFolder="userAvatar"
          name="avatar"
          accept="image/*"
          placeholder="Chọn ảnh đại diện"
          className={styles.inputField}
        />

        <div className={styles.submitArea}>
          <Button
            type="submit"
            className={styles.submitArea__button}
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Cập nhật
          </Button>
        </div>
      </Form>
    </Paper>
  );
};

export default UserInfo;
