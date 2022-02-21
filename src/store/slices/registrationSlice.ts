import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RegistrationSlice = {
  isRegistred: boolean,
};

const initialState: RegistrationSlice = {
  isRegistred: false,
};

const registrationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    changeRegistration(state, action: PayloadAction<boolean>) {
      state.isRegistred = action.payload;
    },
  },
});

export const { changeRegistration } = registrationSlice.actions;

export default registrationSlice.reducer;
