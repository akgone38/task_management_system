import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
  },
  email:{
    type:String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email'
    ],
  },
  password: {
    type: String,
    required: function() {
        return !this.googleId; // Password is required only if user is not using Google OAuth
    },
    minlength: 6,
    select: false // Do not return password in queries by default
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows null values to be skipped for uniqueness constraint
  },
  isOAuthUser: {
    type: Boolean,
    default: function () {
      return !!this.googleId; // Automatically set to true if googleId exists
    },
  },
  authMethod: {
    type: String,
    enum: ['email', 'google'],
    required: true,
    default: 'email', // Default auth method is email
  },
  // Storing references to created tasks
  createdTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

export const User= mongoose.model('User',UserSchema);
