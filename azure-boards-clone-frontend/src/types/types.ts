export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  createdBy: string;
  assignedTo: string;
  createdOn: string;
}

export interface User {
  id: string;
  name: string;
}
