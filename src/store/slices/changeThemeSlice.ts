import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type ChangeThemeSlice = {
  isDarkTheme: boolean,
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
      Cookies.set('isDarkTheme', `${state.isDarkTheme}`);
    },
    setTheme(state, action:PayloadAction<boolean>) {
      state.isDarkTheme = action.payload;
    },
  },
});

export const { changeTheme, setTheme } = changeThemeSlice.actions;

export default changeThemeSlice.reducer;
