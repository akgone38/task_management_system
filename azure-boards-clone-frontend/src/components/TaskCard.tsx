import React from 'react';
import { Task } from '../types/types';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  return (
    <div className="task-card" onClick={onClick}>
      <h3>{task.title}</h3>
      <p>Priority: {task.priority}</p>
      <p>Assigned to: {task.assignedTo}</p>
    </div>
  );
};

export default TaskCard;
