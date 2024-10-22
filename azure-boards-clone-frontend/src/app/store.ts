// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import tasksReducer from '../features/tasks/tasksSlice';
import usersReducer from '../features/users/usersSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed dispatch hook
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();
