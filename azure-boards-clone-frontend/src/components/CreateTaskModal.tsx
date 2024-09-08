import React, { useState } from 'react';
import { Task } from '../types/types';
import { useDispatch } from 'react-redux';
import { createTaskAsync } from '../features/tasks/tasksAPI';
import { AppDispatch } from '../app/store';

interface CreateTaskModalProps {
  onClose: () => void;
  users: Array<{ _id: string; username: string }>;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ onClose, users }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = () => {
    if (!assignedTo) {
      alert('Please assign the task to a user.');
      return;
    }

    const newTask: Omit<Task, 'id'> = {
      title,
      description,
      priority,
      status,
      assignedTo,
      createdOn: new Date().toISOString(),
      createdBy: 'currentUserId', // Replace with actual current user's ID
      _id: '', // Leave _id empty
      taskNumber: undefined, // Remove taskNumber since it will be handled by backend
    };

    console.log('New Task:', newTask);

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
        Status:
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'Active' | 'In Progress' | 'Completed' | 'Hold')}
        >
          <option value="Active">Active</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Hold">Hold</option>
        </select>
      </label>
      <label>
        Assign to:
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
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
