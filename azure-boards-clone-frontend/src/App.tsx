import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import AppInitializer from './components/AppInitializer'; // Import the AppInitializer component
import HomePage from './components/HomePage'; // Example component
import Login from './components/Login'; // Example component
import Register from './components/Register'; // Example component

import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppInitializer /> {/* Initialize async operations */}
        <div className="app">
          {/* Header */}
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Task Management System
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Main Content */}
          <Container sx={{ py: 3 }}> {/* 'py' is padding on the y-axis */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Container>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              py: 3,
              px: 2,
              mt: 'auto',
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[200]
                  : theme.palette.grey[800],
                  textAlign: 'center',
            }}
          >
            <Container maxWidth="sm">
              <Typography variant="body1">
                &copy; 2024 Task Management System
              </Typography>
            </Container>
          </Box>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
