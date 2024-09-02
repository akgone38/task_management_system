const API_BASE_URL = 'http://localhost:5001/api'; // Change to your backend URL

export const fetchTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  return response.json();
};

export const createTask = async (task: any) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });
  return response.json();
};
