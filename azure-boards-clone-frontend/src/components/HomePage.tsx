import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import CreateTaskModal from './CreateTaskModal';
import { Grid, Typography, Button, Box, Paper } from '@mui/material';
import TaskCard from './TaskCard';
import FilterBar from './FilterBar';
import { fetchUserDetails, fetchAllUsers } from '../features/users/usersAPI';
import { Task } from '../types/types';
import { logout,setToken } from '../features/users/usersSlice';
import { fetchTasksAsync } from '../features/tasks/tasksAPI';
import { useNavigate,useLocation } from 'react-router-dom';

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // To check the current path

  const { user, token, status, allUsers } = useSelector((state: RootState) => state.users);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  // const tasksStatus = useSelector((state: RootState) => state.tasks.status);
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);


  // Capture token from URL and set it in localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    
    if (urlToken) {
      localStorage.setItem('token', urlToken);
      dispatch(setToken(urlToken)); // Update Redux with the token
      window.history.replaceState({}, document.title, '/'); // Clean up URL
      dispatch(fetchUserDetails()); // Fetch user details once token is set
    }
  }, [dispatch]);

  // Fetch tasks once the token is available
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !token) {
      dispatch(setToken(storedToken)); // Update Redux state with the token
      dispatch(fetchUserDetails());
    }
    if (token) {
      dispatch(fetchAllUsers());
      dispatch(fetchTasksAsync());
    }
  }, [dispatch, token]);
  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Redirect to login if not logged in
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  // Task click handler to select a task
  // const handleTaskClick = (taskNumber: string) => {
  //   const task = tasks.find((t) => t._id === taskNumber);
  //   setSelectedTask(task || null);
  // };
  const handleTaskClick = (taskNumber: number|undefined) => {
    navigate(`/tasks/${taskNumber}`); // Redirect to TaskDetails page with task ID
  };

  // Handle filters
  const handleFilterChange = (status: string[], priority: string[]) => {
    setStatusFilter(status);
    setPriorityFilter(priority);
  };

  // Normalize string for filter comparison
  const normalizeString = (str: string) => str.toLowerCase().replace(/ /g, '-');
  const normalizedStatusFilter = statusFilter.map(normalizeString);
  const normalizedPriorityFilter = priorityFilter.map(normalizeString);

  // Filter tasks based on status and priority
  const filteredTasks = tasks.filter((task) => {
    const taskStatus = normalizeString(task.status);
    const taskPriority = normalizeString(task.priority);

    const statusMatch = normalizedStatusFilter.length === 0 || normalizedStatusFilter.includes(taskStatus);
    const priorityMatch = normalizedPriorityFilter.length === 0 || normalizedPriorityFilter.includes(taskPriority);

    return statusMatch && priorityMatch;
  });

  // Conditional rendering based on the token and user status
  if (!token) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h4">You are not logged in</Typography>
        <Button variant="contained" color="primary" onClick={handleLoginRedirect}>
          Go to Login
        </Button>
      </Box>
    );
  }


  if (status === 'loading' && location.pathname === '/') { // Only show loading message on homepage
    return <Typography variant="h4" textAlign="center">Loading user data...</Typography>;
  }
  if (status === 'failed') {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h4" color="error">Failed to load user data.</Typography>
        <Button variant="contained" color="primary" onClick={handleLoginRedirect}>
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Welcome, {user?.username}!</Typography>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Typography variant="body1" mb={2}>Email: {user?.email}</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowCreateTask(true)}
        sx={{ marginBottom: '16px' }}
      >
        Create Task
      </Button>

      <FilterBar
        onFilterChange={handleFilterChange}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
      />

      <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
        <Grid item xs={1}>
          <Typography>ID</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>Task Number</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Title</Typography>
        </Grid>
        {/* <Grid item xs={3}>
          <Typography>Description</Typography>
        </Grid> */}
        <Grid item xs={2}>
          <Typography>Status</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>Priority</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>Assigned To</Typography>
        </Grid>
      </Grid>

      {/* <Box>
        {tasksStatus === 'loading' ? (
          <Typography>Loading tasks...</Typography>
        ) : tasksStatus === 'failed' ? (
          <Typography color="error">Failed to load tasks.</Typography>
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <TaskCard
              key={task._id}
              task={task}
              users={allUsers || []}
              onClick={() => handleTaskClick(task._id)}
              index={index + 1}
            />
          ))
        ) : (
          <Typography>No tasks available for the selected filters.</Typography>
        )}
      </Box> */}
      <Box>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <TaskCard
              key={task._id}
              task={task}
              users={allUsers || []} // Use allUsers instead of just the logged-in user
              onClick={() => handleTaskClick(task.taskNumber)}
              index={index + 1}
            />
          ))
        ) : (
          <Typography>No tasks available.</Typography>
        )}
      </Box>

      {showCreateTask && (
        <CreateTaskModal onClose={() => setShowCreateTask(false)} users={allUsers || []} />
      )}

      {selectedTask && (
        <Paper sx={{ padding: '20px', marginTop: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6">Title</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {selectedTask.title}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6">Description</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {selectedTask.description}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6">Priority</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {selectedTask.priority}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6">Assigned to</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {selectedTask.assignedTo || 'Unassigned'}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6">Created on</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {new Date(selectedTask.createdOn).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default HomePage;

