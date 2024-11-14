import React from 'react';
import { Grid, Typography, Avatar, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PersonIcon from '@mui/icons-material/Person';
import { Task, User } from '../types/types';

interface TaskCardProps {
  task: Task;
  users: User[];
  onClick: () => void;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, users, onClick, index }) => {
  console.log("TaskCard - Task:", task);
  console.log("TaskCard - Users:", users);

  const taskAssignedTo = task.assignedTo?.toString().trim();
  console.log("TaskCard - Task Assigned To:", taskAssignedTo);

  const assignedUser = users.find(user => {
    const userId = user._id?.toString().trim();
    console.log("Comparing User ID:", userId, "with Task Assigned To:", taskAssignedTo);
    return userId === taskAssignedTo;
  });

  console.log("Assigned User:", assignedUser);

  const getStatusSymbolAndText = (status: string) => {
    switch (status) {
      case 'Active':
        return { icon: <FiberManualRecordIcon sx={{ color: 'green' }} />, text: 'Active' };
      case 'In Progress':
        return { icon: <HourglassEmptyIcon sx={{ color: 'blue' }} />, text: 'In Progress' };
      case 'Completed':
        return { icon: <CheckCircleIcon sx={{ color: 'green' }} />, text: 'Completed' };
      case 'Hold':
        return { icon: <PauseCircleOutlineIcon sx={{ color: 'orange' }} />, text: 'Hold' };
      default:
        return { icon: <FiberManualRecordIcon sx={{ color: 'gray' }} />, text: 'New' };
    }
  };

  const statusInfo = getStatusSymbolAndText(task.status);

  return (
    <Grid container spacing={2} className="task-card" onClick={onClick} sx={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
      <Grid item xs={1}>
        <Typography noWrap>{index}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography noWrap>{task.taskNumber}</Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{task.title}</Typography>
      </Grid>
      {/* <Grid item xs={3}>
        <Typography noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{task.description}</Typography>
      </Grid> */}
      <Grid item xs={2}>
        <Box display="flex" alignItems="center">
          {statusInfo.icon}
          <Typography variant="body2" sx={{ marginLeft: '5px', marginRight: '2px', whiteSpace: 'nowrap' }}>
            {statusInfo.text}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={1}>
        <Typography noWrap sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{task.priority}</Typography>
      </Grid>
      <Grid item xs={1}>
        {assignedUser ? (
          <Avatar>{assignedUser.username[0]}</Avatar>
        ) : (
          <Avatar><PersonIcon /></Avatar>
        )}
        <Typography>{assignedUser ? assignedUser.email : 'Unassigned'}</Typography>
      </Grid>
    </Grid>
  );
};

export default TaskCard;
