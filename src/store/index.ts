import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { changeTheme } from './slices/changeThemeSlice';

const rootReducer = combineReducers({
  changeTheme,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
