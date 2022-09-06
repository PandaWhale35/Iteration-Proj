import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  showLogin: true,
  showCredentialsError: false,
  showPasswordError: false,
  showSignupError: false,
  showSignup: false,
  users: 0,
};

export const homepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    toggleLogin: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.showLogin = true;
      state.showSignup = false;
    },
    toggleSignup: (state) => {
      state.showLogin = false;
      state.showSignup = true;
    },
    passwordError: (state) => {
      state.showPasswordError = true;
    },
    signupError: (state) => {
      state.showSignupError = true;
    },
    loginError: (state) => {
      state.showCredentialsError = true;
    },
  }
});


// Action creators are generated for each case reducer function
export const { toggleLogin, toggleSignup, passwordError, signupError, loginError } = homepageSlice.actions;

export default homepageSlice.reducer;