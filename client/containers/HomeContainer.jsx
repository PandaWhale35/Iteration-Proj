import React, { Component } from 'react';
import {Box, Typography } from '@mui/material/';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { toggleLogin, toggleSignup, loginError, passwordError, signupError } from '../reducers/homepage';

const HomeContainer = (props) => {
  const dispatch = useDispatch();
  return (
    <div id="home-container">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
        <Typography component="h1" variant="h4">
          Welcome to Parent Teacher Conferences
        </Typography>
      </Box>
      {/* Should I pass props here or further, still dispatch to parent? */}
      <div id="auth-container">
        <Login 
          show={ useSelector((state) => state.homepage.showLogin) }
          showError={ useSelector((state) => state.homepage.showCredentialsError) }
          toggleSignup = { () => dispatch(toggleSignup()) }
          loginError={ () => dispatch(loginError()) }
        />
        <Signup 
          show={ useSelector((state) => state.homepage.showSignup) }
          showPasswordError={ useSelector((state) => state.homepage.showPasswordError) }
          showSignupError={ useSelector((state) => state.homepage.showSignupError) }  
          toggleLogin={ () => dispatch(toggleLogin()) }
          passwordError={ () => dispatch(passwordError()) }
          signupError={ () => dispatch(signupError()) }
        />  
      </div>
    </div>
  );
};

export default HomeContainer;