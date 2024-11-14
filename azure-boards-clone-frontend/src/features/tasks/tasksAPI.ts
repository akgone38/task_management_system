// tasksAPI.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../../types/types';
import { fetchTasks, createTask, getTaskDetails, addComment, editComment } from '../../api/taskApi';

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

// Thunk for fetching task details by task number
export const fetchTaskDetailsAsync = createAsyncThunk<Task, string>(
  'tasks/fetchTaskDetails',
  async (taskNumber) => {
    const taskDetails = await getTaskDetails(taskNumber);
    return taskDetails;
  }
);

// Thunk for adding a comment to a task
export const addCommentAsync = createAsyncThunk<Comment, { taskNumber: string; text: string }>(
  'tasks/addComment',
  async ({ taskNumber, text }) => {
    const newComment = await addComment(taskNumber, { text });
    return newComment;
  }
);

// Thunk for editing a comment on a task
export const editCommentAsync = createAsyncThunk<Comment, { taskNumber: string; commentId: string; text: string }>(
  'tasks/editComment',
  async ({ taskNumber, commentId, text }) => {
    const updatedComment = await editComment(taskNumber, commentId, { text });
    return updatedComment;
  }
);