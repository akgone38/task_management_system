// tasksAPI.ts
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

// Thunk for creating a new task and refetching tasks
export const createTaskAsync = createAsyncThunk<Task, Omit<Task, 'id'>>(
  'tasks/createTask',
  async (task, { dispatch }) => {
    const newTask = await createTask(task);
    // Refetch the task list after creating a new task
    dispatch(fetchTasksAsync());
    return newTask;
  }
);
