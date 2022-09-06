import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store.js';
import { AppBar, Toolbar, Avatar, Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
// import { logout } from '../reducers/scheduleReducers';

import styles from './stylesheets/styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <AppBar position="static">
      <Toolbar
        disableGutters
        sx={{ display: 'flex', justifyContent: 'space-between', height: '60px' }}
      >
        <Avatar
          sx={{
            width: 50,
            height: 50,
            m: 1.8,
            bgcolor: 'white',
            color: 'primary.main',
          }}
        >
          <SchoolIcon fontSize="large" />
        </Avatar>
        <Button variant="text" sx={{ color: 'white', display: 'none' }}> {/* SA When a user logs in, the display for this button needs to be set to auto */}
          Logout
        </Button>
      </Toolbar>
    </AppBar>
    <App />
  </Provider>
);
