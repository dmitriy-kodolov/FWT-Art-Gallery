import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ControlSchema } from '../../types/types';
import { createUser } from '../../utils/api/methods';

type RegistrationSlice = {
  isRegistrationOpen: boolean,
  errorRegistrat: boolean,
  profileInfo: {
    login?: string,
    password?: string,
  }
};

const initialState: RegistrationSlice = {
  isRegistrationOpen: false,
  errorRegistrat: false,
  profileInfo: {
    login: '',
    password: '',
  },
};

export const fetchRegistration = createAsyncThunk(
  'fetchRegistration',
  async (body: ControlSchema) => {
    const response = await createUser(body);
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
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.profileInfo = action.payload;
    });

    builder.addCase(fetchRegistration.rejected, (state) => {
      state.errorRegistrat = true;
    });
  },
});

export const { changeRegistration } = registrationSlice.actions;

export default registrationSlice.reducer;
