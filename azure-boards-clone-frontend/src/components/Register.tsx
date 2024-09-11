import React, { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/users/usersAPI'; 
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../app/store'; 
import { TextField, Button, Typography, Container, Box } from '@mui/material';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>(); 
  const navigate = useNavigate();

  const { error, status } = useSelector((state: RootState) => state.users);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const registerData: RegisterFormData = { username, email, password };
      await dispatch(registerUser(registerData)).unwrap();
      setIsRegistered(true);
    } catch (err) {
      // Error handling for registration errors
      setIsRegistered(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Register</Typography>
        {!isRegistered ? (
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={status === 'loading'}
              style={{ marginTop: '1rem' }}
            >
              Register
            </Button>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Typography variant="body1">Registration successful! Please log in.</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/login')}
              style={{ marginTop: '1rem' }}
            >
              Go to Login
            </Button>
          </div>
        )}
        {!isRegistered && (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Typography variant="body2">Already have an account?</Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/login')}
              style={{ marginTop: '0.5rem' }}
            >
              Login Here
            </Button>
          </div>
        )}
        {/* Display error message only if relevant to registration */}
        {status === 'failed' && (
          <Typography variant="body2" color="error" style={{ marginTop: '1rem', textAlign: 'center' }}>
            Registration failed: {error}
          </Typography>
        )}
      </div>
    </Container>
  );
};

export default Register;
