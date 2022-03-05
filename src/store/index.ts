import { configureStore } from '@reduxjs/toolkit';
import authorizationSlice from './slices/authorizationSlice';
import changeThemeSlice from './slices/changeThemeSlice';
import getArtistsSlice from './slices/artistsSlice';
import getPaintingsSlice from './slices/paintingsSlice';
import registrationSlice from './slices/registrationSlice';

const store = configureStore({
  reducer: {
    theme: changeThemeSlice,
    artists: getArtistsSlice,
    paintings: getPaintingsSlice,
    auth: authorizationSlice,
    registration: registrationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
