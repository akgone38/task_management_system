import { createSlice } from '@reduxjs/toolkit';
import { fetchUsersAsync } from './usersAPI';
import { User } from '../../types/types';

interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Add reducers here if needed
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsersAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;
