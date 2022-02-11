import { configureStore } from '@reduxjs/toolkit';
import changeThemeSlice from './slices/changeThemeSlice';
import getArtistsSlice from './slices/getArtistsSlice';

const store = configureStore({
  reducer: {
    theme: changeThemeSlice,
    artists: getArtistsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
