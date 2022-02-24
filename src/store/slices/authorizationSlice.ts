import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ControlSchema } from '../../types/types';
import { postAuthorization } from '../../utils/api/methods';

type AuthorizationSlice = {
  isAuthOpen: boolean,
  isAuth: boolean,
  errorAuth: boolean,
};

const initialState: AuthorizationSlice = {
  isAuthOpen: false,
  isAuth: false,
  errorAuth: false,
};

export const fetchAuthorization = createAsyncThunk(
  'fetchAuthorization',
  async (body: ControlSchema) => {
    const response = await postAuthorization(body);
    return (response.data);
  },
);

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    changeIsOpenModalAuth(state, action: PayloadAction<boolean>) {
      state.isAuthOpen = action.payload;
    },
    changeIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorization.fulfilled, (state) => {
      state.isAuth = true;
    });
    builder.addCase(fetchAuthorization.rejected, (state) => {
      state.errorAuth = true;
    });
  },
});

export const { changeIsOpenModalAuth, changeIsAuth } = authorizationSlice.actions;

export default authorizationSlice.reducer;
