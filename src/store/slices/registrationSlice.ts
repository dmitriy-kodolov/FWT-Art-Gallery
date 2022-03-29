import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { ControlSchema } from '../../types/types';
import { createUser } from '../../utils/api/methods';

type RegistrationSlice = {
  isRegistrationOpen: boolean,
  errorRegistrat: boolean,
};

const initialState: RegistrationSlice = {
  isRegistrationOpen: false,
  errorRegistrat: false,
};

export const fetchRegistration = createAsyncThunk(
  'fetchRegistration',
  async (body: ControlSchema) => {
    const response = await createUser(body);
    Cookies.set('accessToken', `${response.data.accessToken}`);
    Cookies.set('refreshToken', `${response.data.refreshToken}`);

    return (response.data);
  },
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    changeRegistration(state, action: PayloadAction<boolean>) {
      state.isRegistrationOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegistration.fulfilled, (state) => {
      state.errorRegistrat = false;
      state.isRegistrationOpen = false;
    });
    builder.addCase(fetchRegistration.rejected, (state) => {
      state.errorRegistrat = true;
    });
  },
});

export const { changeRegistration } = registrationSlice.actions;

export default registrationSlice.reducer;
