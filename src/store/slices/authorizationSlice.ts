import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthorizationSlice = {
  isAuth: boolean,
};

const initialState: AuthorizationSlice = {
  isAuth: false,
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    changeAuthorization(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const { changeAuthorization } = authorizationSlice.actions;

export default authorizationSlice.reducer;
