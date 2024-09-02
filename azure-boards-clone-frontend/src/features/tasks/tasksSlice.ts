import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchTasks } from '../../api/taskApi';
import { Task } from '../../types/types';

interface TasksState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TasksState = {
  tasks: [],
  status: 'idle',
};

export const fetchTasksAsync = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetchTasks();
  return response;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Define the addTask action
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasksAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

// Export the addTask action
export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;
