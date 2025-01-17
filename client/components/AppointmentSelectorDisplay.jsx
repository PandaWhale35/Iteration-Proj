import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
} from '@mui/material/';
import { useSelector, useDispatch } from 'react-redux';
import { submit, handleChange } from '../reducers/scheduleReducers';

export const AppointmentSelectorDisplay = (props) => {
  const studentName = useSelector((state) => state.schedule.studentName);
  const teacher = useSelector(state => state.schedule.teacherData[0]);
  const parentName = useSelector(state => state.schedule.parentName);
  // console.log(teacher);
  const [isActive, setIsActive] = useState(false);
  const appointmentTime = useSelector(
    (state) => state.schedule.appointmentTime
  );

  const teacherData = props;
  const { name, availability } = teacherData;
  const teacherName = name;
  const payload = {studentName, teacherName, appointmentTime};
  const dispatch = useDispatch();

  const availabilityOptions = [];
  availability.forEach((time, i) => {
    availabilityOptions.push(
      <MenuItem key={`Time Option ${i}`} value={time}>
        {' '}
        {time}{' '}
      </MenuItem>
    );
  });
  return (
    <Box
      sx={{
        width: 500,
        height: 150,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="p" sx={{ display: isActive ? 'auto' : 'none' }}>
        Appointment Scheduled from {appointmentTime} with {teacherName}.
      </Typography>
      <FormControl
        sx={{
          m: 1,
          minWidth: 80,
          display: isActive ? 'none' : 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '30px',
        }}
      >
        <Typography variant="p">{teacherName}:</Typography>
        <InputLabel id="appointment-scheduler">Time</InputLabel>
        <Select
          labelId="appointment-time-selector"
          id="appointment-time-selector"
          value={appointmentTime}
          onChange={(event) => {
            dispatch(handleChange(event.target.value));
          }}
          autoWidth
          label="Time"
          sx={{ bgcolor: '#dbeaf9' }}
        >
          <MenuItem value="None">
            <em>None</em>
          </MenuItem>
          {availabilityOptions}
        </Select>
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            setIsActive((current) => !current);
            addAppt(appointmentTime, teacher, studentName, parentName)
            // dispatch(submit(payload));
          }}
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};


function addAppt(appointmentTime, teacher, studentName, parentName) {
  // console.log(appointmentTime, teacher, studentName, parentName);
  axios.post('/teacher/updatetimes', {
    type:'add',
    teacherId: teacher.teacherId,
    childName: studentName,
    parentName: parentName,
    time: appointmentTime,
  }).then(data => console.log(data))
    .catch((err) => {
      console.log(err);
    });
}