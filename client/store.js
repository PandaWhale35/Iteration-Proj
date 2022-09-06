import { configureStore } from '@reduxjs/toolkit';
import homepageReducer from './reducers/homepage';
import scheduleReducer from './reducers/scheduleReducers';

export const store = configureStore({
  reducer: {
    homepage: homepageReducer,
    schedule: scheduleReducer,
  },
});
