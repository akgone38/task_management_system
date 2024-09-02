import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../../types/types';
import { fetchTasks, createTask } from '../../api/taskApi';

export const fetchTasksAsync = createAsyncThunk('tasks/fetchTasks', async () => {
  const tasks = await fetchTasks();
  return tasks;
});

export const createTaskAsync = createAsyncThunk('tasks/createTask', async (task: Task) => {
  const newTask = await createTask(task);
  return newTask;
});
