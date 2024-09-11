export interface Task {
  _id: string;  // Aligns with backend's _id field
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  createdBy: string;
  assignedTo: string;
  status:string;
  taskNumber?:number;
  createdOn: string;
  createdAt?: string;  // Include these if you plan to use them
  updatedAt?: string;  // Include these if you plan to use them
}

// User type definition
export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'Admin' | 'User';  // Different roles the user can have
  avatarUrl?: string;      // Optional field for avatar image
  createdTasks?: string[];
}
export interface ErrorResponse {
  message: string;
  statusCode?: number; // Optional, if you have status codes in the response
  error?: string; // Optional, for additional error details
}
// export interface User {
//   _id: string;
//   username: string;
// }
