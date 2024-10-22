import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTasksAsync, createTaskAsync } from './tasksAPI';
import { Task } from '../../types/types';

interface TasksState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TasksState = {
  tasks: [],
  status: 'idle',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasksAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'idle';
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, state => {
        state.status = 'failed';
      })
      .addCase(createTaskAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(createTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = 'idle';
        state.tasks.push(action.payload);
      })
      .addCase(createTaskAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;
