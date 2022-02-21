import { configureStore } from '@reduxjs/toolkit';
import changeThemeSlice from './slices/changeThemeSlice';
import getArtistsSlice from './slices/getArtistsSlice';
import getPaintingsSlice from './slices/getPaintingsSlice';

const store = configureStore({
  reducer: {
    theme: changeThemeSlice,
    artists: getArtistsSlice,
    paintings: getPaintingsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
