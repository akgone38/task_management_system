import React from 'react';
import { Task } from '../types/types';

interface TaskDetailsProps {
  task: Task;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
  return (
    <div className="task-details">
      <h2>{task.title}</h2>
      <p>Description: {task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Assigned to: {task.assignedTo}</p>
      <p>Created on: {new Date(task.createdOn).toLocaleDateString()}</p>
    </div>
  );
};

export default TaskDetails;
