import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import CreateTaskModal from './CreateTaskModal';
import { Grid, Typography, Button } from '@mui/material';
import TaskCard from './TaskCard';
import TaskDetails from './TaskDetails';
import FilterBar from './FilterBar';
import { fetchTasksAsync } from '../features/tasks/tasksAPI';
import { fetchUsersAsync } from '../features/users/usersAPI';
import { Task } from '../types/types';
import '../styles/HomePage.css'; // Import custom styles

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const users = useSelector((state: RootState) => state.users.users);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [showCreateTask, setShowCreateTask] = React.useState(false);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchTasksAsync());
    dispatch(fetchUsersAsync());
  }, [dispatch]);

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

  console.log('Normalized Status Filter:', normalizedStatusFilter);
  console.log('Filtered Tasks:', filteredTasks);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Task Management</Typography>
      <Button variant="contained" color="primary" onClick={() => setShowCreateTask(true)}>
        Create Task
      </Button>
      <FilterBar
        onFilterChange={handleFilterChange}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
      />

      {/* Task header */}
      <Grid container spacing={2} className="task-header">
        <Grid item xs={1}><Typography>ID</Typography></Grid>
        <Grid item xs={2}><Typography>Task Number</Typography></Grid>
        <Grid item xs={3}><Typography>Title</Typography></Grid>
        <Grid item xs={3}><Typography>Description</Typography></Grid>
        <Grid item xs={1}><Typography>Status</Typography></Grid>
        <Grid item xs={1}><Typography>Priority</Typography></Grid>
        <Grid item xs={1}><Typography>Assigned To</Typography></Grid>
      </Grid>

      {/* Task list */}
      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <TaskCard
              key={task._id}
              task={task}
              users={users}
              onClick={() => handleTaskClick(task._id)}
              index={index + 1} // Pass 1-based index
            />
          ))
        ) : (
          <Typography>No tasks available.</Typography>
        )}
      </div>

      {showCreateTask && <CreateTaskModal onClose={() => setShowCreateTask(false)} users={users} />}
      {selectedTask && <TaskDetails task={selectedTask} />}
    </div>
  );
};

export default HomePage;
