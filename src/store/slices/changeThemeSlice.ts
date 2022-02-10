import { createSlice } from '@reduxjs/toolkit';

type ChangeThemeSlice = {
  isDarkTheme: boolean
};

const initialState:ChangeThemeSlice = {
  isDarkTheme: true,
};

const changeThemeSlice = createSlice({
  name: 'changeTheme',
  initialState,
  reducers: {
    changeTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const { changeTheme } = changeThemeSlice.actions;
export default changeThemeSlice.reducer;
