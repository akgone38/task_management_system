import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import tasksReducer from '../features/tasks/tasksSlice';
import usersReducer from '../features/users/usersSlice';
import { fetchTasksAsync } from '../features/tasks/tasksAPI'; // Import the async thunk
import { fetchUsersAsync } from '../features/users/usersAPI'; // Import the async thunk

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
  },
});

// Fetch data when the store is created (still valid)
store.dispatch(fetchTasksAsync());
store.dispatch(fetchUsersAsync());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed dispatch example (use this in your components)
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();
