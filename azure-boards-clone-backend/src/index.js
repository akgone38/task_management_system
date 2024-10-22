import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from './config/passport.js';
import { connectDB } from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Import auth routes
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Setup Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: true,
}));

// Setup Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
connectDB();

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);  // Updated path
app.use('/api/auth', authRoutes);    // Auth routes for authentication

app.use(cors({
  origin: process.env.CLIENT_URL, // Allow requests from your frontend
  credentials: true, // Allow credentials to be sent
}));


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
