import React, { useEffect } from 'react';
import { useAppDispatch } from '../app/store';
import { fetchTasksAsync } from '../features/tasks/tasksAPI';
import { fetchUserDetails } from '../features/users/usersAPI';

const AppInitializer: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch tasks when the app starts
    dispatch(fetchTasksAsync());

    // Only fetch user details if a valid token exists
    if (token) {
      dispatch(fetchUserDetails());
    }
  }, [dispatch, token]);

  return null; // This component doesn’t render anything
};

export default AppInitializer;
