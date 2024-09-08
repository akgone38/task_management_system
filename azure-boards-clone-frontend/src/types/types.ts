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
}
// export interface User {
//   _id: string;
//   username: string;
// }
