import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/users/usersAPI'; 
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../app/store'; 
import { TextField, Button, Box, Typography } from '@mui/material'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { token, error, status } = useSelector((state: RootState) => state.users);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="75vh">
      {/* Display error message only if it exists and is relevant to login */}
      {status === 'failed' && error && (
        <Typography color="error" variant="body2" mb={2}>
          Login failed: {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
        </Box>

        <Box mb={2}>
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <Box mt={2}>
        <Typography variant="body1">
          Don't have an account?
        </Typography>
        <Button color="secondary" onClick={handleRegisterRedirect}>
          Register Here
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
