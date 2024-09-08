import React from 'react';
import { Grid, Typography, Avatar, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline'; // Icon for Hold
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'; // Icon for In Progress
import PersonIcon from '@mui/icons-material/Person';
import { Task, User } from '../types/types';

interface TaskCardProps {
  task: Task;
  users: User[];
  onClick: () => void;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, users, onClick, index }) => {
  const assignedUser = users.find(user => user._id === task.assignedTo);

  // Updated getStatusSymbolAndText to reflect your status options
  const getStatusSymbolAndText = (status: string) => {
    switch (status) {
      case 'Active':
        return { icon: <FiberManualRecordIcon style={{ color: 'green' }} />, text: 'Active' };
      case 'In Progress':
        return { icon: <HourglassEmptyIcon style={{ color: 'blue' }} />, text: 'In Progress' };
      case 'Completed':
        return { icon: <CheckCircleIcon style={{ color: 'green' }} />, text: 'Completed' };
      case 'Hold':
        return { icon: <PauseCircleOutlineIcon style={{ color: 'orange' }} />, text: 'Hold' };
      default:
        return { icon: <FiberManualRecordIcon style={{ color: 'gray' }} />, text: 'New' }; // Default is 'New'
    }
  };

  const statusInfo = getStatusSymbolAndText(task.status);

  return (
    <Grid container spacing={2} className="task-card" onClick={onClick}>
      <Grid item xs={1}><Typography>{index}</Typography></Grid>
      <Grid item xs={2}><Typography>{task.taskNumber}</Typography></Grid>
      <Grid item xs={3}><Typography>{task.title}</Typography></Grid>
      <Grid item xs={3}><Typography>{task.description}</Typography></Grid>

      {/* Updated: Display both the symbol and text for status */}
      <Grid item xs={1}>
        <Box display="flex" alignItems="center">
          {statusInfo.icon}
          <Typography variant="body2" style={{ marginLeft: '5px' }}>
            {statusInfo.text}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={1}><Typography>{task.priority}</Typography></Grid>
      <Grid item xs={1}>
        {assignedUser ? (
          <Avatar>{assignedUser.username[0]}</Avatar>
        ) : (
          <Avatar><PersonIcon /></Avatar>
        )}
        <Typography>{assignedUser ? assignedUser.username : 'Unassigned'}</Typography>
      </Grid>
    </Grid>
  );
};

export default TaskCard;
