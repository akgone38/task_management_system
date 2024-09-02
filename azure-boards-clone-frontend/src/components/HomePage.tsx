import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import CreateTaskModal from './CreateTaskModal';
import TaskCard from './TaskCard';
import TaskDetails from './TaskDetails';
import FilterBar from './FilterBar';
import { fetchTasksAsync } from '../features/tasks/tasksSlice';
import { fetchUsersAsync } from '../features/users/usersSlice';
import { Task } from '../types/types'; // Import the Task type

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const users = useSelector((state: RootState) => state.users.users);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [showCreateTask, setShowCreateTask] = React.useState(false);

  useEffect(() => {
    dispatch(fetchTasksAsync());
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const handleTaskClick = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    setSelectedTask(task || null);
  };

  return (
    <div>
      <h1>Task Management</h1>
      <button onClick={() => setShowCreateTask(true)}>Create Task</button>
      <FilterBar />
      <div className="task-list">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onClick={() => handleTaskClick(task.id)} />
        ))}
      </div>
      {showCreateTask && <CreateTaskModal onClose={() => setShowCreateTask(false)} users={users} />}
      {selectedTask && <TaskDetails task={selectedTask} />}
    </div>
  );
};

export default HomePage;
