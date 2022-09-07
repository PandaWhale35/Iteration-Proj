import React from 'react';
import { Box, Button, Avatar, TextField, Grid } from '@mui/material/';
import SchoolIcon from '@mui/icons-material/School';
import Error from './Error';

const Signup = (props) =>  {

  const { show, showPasswordError, showSignupError, toggleLogin, passwordError, signupError } = props;

  const submitPostRequest = (e) => {
    if (e.password !== e.confirmPassword) passwordError();
    else {
      fetch('/api/parents/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          studentId: e.studentId, 
          emaiL: e.email, 
          password: e.password
        }
      }).then(res => {
        if (res.message === 'error') signupError();
        else 'MLCK redirect';
      });
    }
  };

  if (show) return (
    <Box
      sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ width: 80, height: 80, m: 1.8, bgcolor: 'primary.main' }}>
        <SchoolIcon fontSize='large' />
      </Avatar>
      <Box component="form" onSubmit={submitPostRequest} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="studentId"
          label="Student ID"
          name="student-id"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirm-password"
          label="Confirm Password"
          type="password"
          id="confirm-password"
        />
        <Error
          show={showPasswordError}
          message="Passwords do not match"
        />
        <Error
          show={showSignupError}
          message="Incorrect student ID and/or email address"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
            Create Account
        </Button>
        <Grid container>
          <Button variant="text" onClick={toggleLogin}>
            {'Already have an account? Log In'}
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};

export default Signup;