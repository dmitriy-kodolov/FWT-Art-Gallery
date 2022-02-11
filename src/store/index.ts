import { configureStore } from '@reduxjs/toolkit';
import changeThemeSlice from './slices/changeThemeSlice';

const store = configureStore({
  reducer: {
    theme: changeThemeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
