import React from 'react';
import { Box, Button, Avatar, TextField, Grid } from '@mui/material/';
import { useSelector, useDispatch } from 'react-redux';
import SchoolIcon from '@mui/icons-material/School';
import Error from './Error';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginSuccess } from '../reducers/scheduleReducers';

const Login = (props) => {

  const { show, showError, toggleSignup, loginError } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitGetRequest = (e) => {

    e.preventDefault();
    // console.log('submitting get request');
    // console.log('Event', e);
    // const payload = { studentName: 'Stu1', teacherData: ['teacher1'] };
    // dispatch(loginSuccess(payload));
    // navigate('/schedule');

    //to get data adam
    //e.target.emailforform
    //e.target.password
    const body = {
      email: e.target.emailforForm.value,
      password: e.target.password.value
    };
    fetch('/parents/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)

    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'error') loginError();
        else {
          const payload = { studentName: res.studentName, teacherData: res.teacherData };
          // dispatch(loginSuccess(payload));
          navigate('/schedule');
        }
      });
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
      <form onSubmit={submitGetRequest}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="emailforForm"
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
        <Error
          show={showError}
          message="Incorrect email address and/or password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </Button>
        <Grid container>
          <Button variant="text" onClick={toggleSignup}>
            {'Don\'t have an account? Sign Up'}
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default Login;