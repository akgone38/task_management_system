import { createAsyncThunk } from '@reduxjs/toolkit';
// import { User } from '../../types/types';
import { fetchUsers } from '../../api/userApi'; // Assuming fetchUsers is in taskApi.ts

export const fetchUsersAsync = createAsyncThunk('users/fetchUsers', async () => {
  const users = await fetchUsers();
  return users;
});
