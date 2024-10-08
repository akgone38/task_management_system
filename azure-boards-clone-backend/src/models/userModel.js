import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   createdTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
//   // Add other user-related fields as needed
// }, { timestamps: true });

// export const User = mongoose.model('User', userSchema);

import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  createdTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

export const User= mongoose.model('User',UserSchema);
