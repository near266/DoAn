import { combineReducers } from 'redux';

import authReducer from './modules/auth/slice';
import dataAssessmentReducer from './modules/assessment';
import loginReducer from './modules/auth/login';

export const rootReducer = combineReducers({
  auth: authReducer,
  dataAssessment: dataAssessmentReducer,
  login: loginReducer,
});
