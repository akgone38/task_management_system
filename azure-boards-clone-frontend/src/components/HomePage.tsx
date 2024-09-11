import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import CreateTaskModal from './CreateTaskModal';
import { Grid, Typography, Button, Box, Paper } from '@mui/material';
import TaskCard from './TaskCard';
import FilterBar from './FilterBar';
import { fetchUserDetails, fetchAllUsers } from '../features/users/usersAPI'; // Updated to fetch all users
import { Task } from '../types/types';
import { logout } from '../features/users/usersSlice'; // Import logout action
import { useNavigate, useLocation } from 'react-router-dom';

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // To check the current path

  const { user, token, status, allUsers } = useSelector((state: RootState) => state.users); // Updated to get allUsers
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);

  useEffect(() => {
    if (token && !user && location.pathname === '/') { // Only fetch user details on homepage
      dispatch(fetchUserDetails());
    }

    // Fetch all users when token exists
    if (token && location.pathname === '/') {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, token, user, location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleTaskClick = (taskId: string) => {
    const task = tasks.find(t => t._id === taskId);
    setSelectedTask(task || null);
  };

  const handleFilterChange = (status: string[], priority: string[]) => {
    setStatusFilter(status);
    setPriorityFilter(priority);
  };

  const normalizeString = (str: string) => str.toLowerCase().replace(/ /g, '-');
  const normalizedStatusFilter = statusFilter.map(status => normalizeString(status));
  const normalizedPriorityFilter = priorityFilter.map(priority => normalizeString(priority));

  const filteredTasks = tasks.filter(task => {
    const taskStatus = normalizeString(task.status);
    const taskPriority = normalizeString(task.priority);

    const statusMatch = normalizedStatusFilter.length === 0 || normalizedStatusFilter.includes(taskStatus);
    const priorityMatch = normalizedPriorityFilter.length === 0 || normalizedPriorityFilter.includes(taskPriority);

    return statusMatch && priorityMatch;
  });

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
        style={{ marginBottom: '16px' }} // using inline CSS for margin-bottom
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
        <Grid item xs={2}>
          <Typography>Title</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Description</Typography>
        </Grid>
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

      <Box>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <TaskCard
              key={task._id}
              task={task}
              users={allUsers || []} // Use allUsers instead of just the logged-in user
              onClick={() => handleTaskClick(task._id)}
              index={index + 1}
            />
          ))
        ) : (
          <Typography>No tasks available.</Typography>
        )}
      </Box>

      {showCreateTask && <CreateTaskModal onClose={() => setShowCreateTask(false)} users={allUsers || []} />} {/* Pass allUsers */}
      {selectedTask && (
        <Paper sx={{ padding: '20px', marginTop: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6" component="div">Title</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {selectedTask.title}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6" component="div">Description</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {selectedTask.description}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6" component="div">Priority</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {selectedTask.priority}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6" component="div">Assigned to</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {selectedTask.assignedTo || 'Unassigned'}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="h6" component="div">Created on</Typography>
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
