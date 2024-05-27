import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './rootReducer';
import { isProduction } from '@/helpers';

const store = configureStore({
  reducer: rootReducer,
  devTools: isProduction() ? false : true,
});

export default store;
