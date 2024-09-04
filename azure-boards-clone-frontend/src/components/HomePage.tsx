import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import CreateTaskModal from './CreateTaskModal';
import TaskCard from './TaskCard';
import TaskDetails from './TaskDetails';
import FilterBar from './FilterBar';
import { fetchTasksAsync } from '../features/tasks/tasksAPI'; // Correct import
import { fetchUsersAsync } from '../features/users/usersAPI'; // Ensure correct path

import { Task } from '../types/types'; // Import the Task type

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const users = useSelector((state: RootState) => state.users.users);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [showCreateTask, setShowCreateTask] = React.useState(false);

  // useEffect(() => {
  //   dispatch(fetchTasksAsync());
  //   dispatch(fetchUsersAsync());
  // }, [dispatch]);
  useEffect(() => {
    dispatch(fetchTasksAsync()).then((action) => {
      console.log('Fetched Tasks:', action.payload); // Inspect the payload
    });
    dispatch(fetchUsersAsync());
  }, [dispatch]);
  

  const handleTaskClick = (taskId: string) => {
    const task = tasks.find(t => t._id === taskId);
    setSelectedTask(task || null);
  };

  // Debugging: Log tasks to ensure it is an array
  console.log('Tasks:', tasks);

  // Ensure tasks is an array before calling map
  if (!Array.isArray(tasks)) {
    return <div>Error: Tasks is not an array</div>;
  }

  return (
    <div>
      <h1>Task Management</h1>
      <button onClick={() => setShowCreateTask(true)}>Create Task</button>
      <FilterBar />
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskCard key={task._id} task={task} onClick={() => handleTaskClick(task._id)} />

            // <TaskCard key={task.id} task={task} onClick={() => handleTaskClick(task.id)} />
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
      {showCreateTask && <CreateTaskModal onClose={() => setShowCreateTask(false)} users={users} />}
      {selectedTask && <TaskDetails task={selectedTask} />}
    </div>
  );
};

export default HomePage;
