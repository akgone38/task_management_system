// export interface Task {
//   id: string;
//   title: string;
//   description: string;
//   priority: 'High' | 'Medium' | 'Low';
//   createdBy: string;
//   assignedTo: string;
//   createdOn: string;
// }
export interface Task {
  _id: string;  // Aligns with backend's _id field
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  createdBy: string;
  assignedTo: string;
  createdOn: string;
  createdAt?: string;  // Include these if you plan to use them
  updatedAt?: string;  // Include these if you plan to use them
}


export interface User {
  id: string;
  name: string;
}
