import React, { useState } from 'react';
import { Task } from '../types/types';
import { useDispatch } from 'react-redux';
import { createTaskAsync } from '../features/tasks/tasksAPI';
import { AppDispatch } from '../app/store'; // Import AppDispatch type

interface CreateTaskModalProps {
  onClose: () => void;
  users: Array<{ id: string; name: string }>;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ onClose, users }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [assignedTo, setAssignedTo] = useState('');
  const dispatch = useDispatch<AppDispatch>(); // Use the correctly typed dispatch

  const handleSave = () => {
    const newTask: Omit<Task, 'id'> = {
      title,
      description,
      priority,
      assignedTo,
      createdOn: new Date().toISOString(),
      createdBy: 'currentUserId',
      _id: ''
    };

    dispatch(createTaskAsync(newTask));
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
          onChange={(e) => setTitle(e.target.value)}
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
