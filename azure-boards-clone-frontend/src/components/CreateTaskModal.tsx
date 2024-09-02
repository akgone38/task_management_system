import React, { useState } from 'react';
import { Task } from '../types/types'; // Import Task type
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';

interface CreateTaskModalProps {
  onClose: () => void;
  users: Array<{ id: string; name: string }>; // Assuming users have id and name
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ onClose, users }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [assignedTo, setAssignedTo] = useState('');
  const dispatch = useDispatch();

  const handleSave = () => {
    const newTask: Task = {
      id: Date.now().toString(), // Use a unique ID generator like `Date.now()`
      title,
      description,
      priority,
      assignedTo,
      createdOn: new Date().toISOString(),
      createdBy: 'currentUserId', // Replace with the actual user ID
    };

    dispatch(addTask(newTask)); // Dispatch the addTask action
    onClose();
  };

  return (
    <div className="modal">
      <h2>Create Task</h2>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // This ensures `setTitle` is used
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Priority:
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </label>
      <label>
        Assign to:
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default CreateTaskModal;
