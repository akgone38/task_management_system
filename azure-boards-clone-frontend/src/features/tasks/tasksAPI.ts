import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../../types/types';
import { fetchTasks, createTask } from '../../api/taskApi';

// Define the fetchTasksAsync thunk
export const fetchTasksAsync = createAsyncThunk<Task[]>(
  'tasks/fetchTasks',
  async () => {
    const tasks = await fetchTasks();
    return tasks;
  }
);

// Thunk for creating a new task
export const createTaskAsync = createAsyncThunk('tasks/createTask', async (task: Omit<Task, 'id'>) => {
  const newTask = await createTask(task);
  return newTask;
});
