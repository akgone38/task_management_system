// usersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser, loginUser, fetchUserDetails, fetchAllUsers } from './usersAPI'; // Import fetchAllUsers
import { User } from '../../types/types';
import { ErrorResponse } from '../../types/types';

interface UsersState {
  user: User | null;
  token: string | null;
  allUsers: User[]; // State to hold all users
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  user: null,
  token: localStorage.getItem('token') || null,
  allUsers: [], // Initialize with an empty array for all users
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.allUsers = []; // Clear allUsers on logout
      localStorage.removeItem('token');
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload; // Set token in the state
      if (action.payload) {
        localStorage.setItem('token', action.payload); // Store token in localStorage
      } else {
        localStorage.removeItem('token'); // Remove token from localStorage if null
      }
    },
  },
  extraReducers: builder => {
    builder
      // Handle user registration
      .addCase(registerUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Registration failed';
      })

      // Handle user login
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Login failed';
      })

      // Handle fetching user details
      .addCase(fetchUserDetails.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch user details';
      })

      // Handle fetching all users
      .addCase(fetchAllUsers.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'idle';
        state.allUsers = action.payload; // Set the fetched users
      })
      .addCase(fetchAllUsers.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch users';
      });
  },
});

export const { logout,setToken } = usersSlice.actions;

export default usersSlice.reducer;
