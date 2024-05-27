import { createSlice } from '@reduxjs/toolkit';
import userLogin from '@/shared/services/userLogin';
import { message } from 'antd';
import { flatMap } from 'lodash-es';

const userToken =
  typeof localStorage !== 'undefined' ? localStorage.getItem('jwtToken') : null;

const loginInitialState = {
  jwtToken: null,
  data: null,
  refreshToken: null,
  succeeded: false,
  loading: true,
  isFetch: true,
};
const LoginSlice = createSlice({
  name: 'Login',
  initialState: loginInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login user
      .addCase(userLogin.pending, (state) => {
        state.data = null;
        state.succeeded = null;
        state.loading = true;
        state.isFetch = true;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        if (payload.data.isBan == 1) {
          message.error('Tài khoản đã bị khóa');
        } else {
          if (payload.data.roles.includes('User')) {
            state.data = payload.data;
            state.jwtToken = payload.data.jwtToken;
            state.succeeded = payload.succeeded;
            state.loading = false;
            state.isFetch = true;

            message.success('Đăng nhập thành công');
          } else {
            state.succeeded = false;

            message.error('Tài khoản không có quyền');
          }
        }
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.succeeded = false;
      });
    // Add reducers for other actions if needed
  },
});

export default LoginSlice.reducer;
