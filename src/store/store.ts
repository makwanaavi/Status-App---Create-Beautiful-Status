import { configureStore } from '@reduxjs/toolkit';
import statusReducer from './slices/statusSlice';
import userReducer from './slices/userSlice';
import editorReducer from './slices/editorSlice';

export const store = configureStore({
  reducer: {
    status: statusReducer,
    user: userReducer,
    editor: editorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;