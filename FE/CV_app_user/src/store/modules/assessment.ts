import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const countSlice = createSlice({
  name: 'dataAssessment',
  initialState: initialState,
  reducers: {
    getDataAssessment: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getDataAssessment } = countSlice.actions;

export default countSlice.reducer;
