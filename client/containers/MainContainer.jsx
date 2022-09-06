import React from 'react';
import { Box, Typography, Avatar, AppBar } from '@mui/material/';
import SchoolIcon from '@mui/icons-material/School';
import { useSelector } from 'react-redux';
import { AppointmentSelectorDisplay } from '../components/AppointmentSelectorDisplay';

export const MainContainer = (props) => {
  const studentName = useSelector((state) => state.schedule.studentName);
  const teacherData = useSelector((state) => state.schedule.teacherData);
  const teacherAppointmentSelectors = [];
  teacherData.forEach((teacher, i) => {
    teacherAppointmentSelectors.push(
      <AppointmentSelectorDisplay key={`teacher ${i}`} {...teacher} />
    );
  });

  return (
    <Box
      sx={{
        width: 500,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 'auto',
        marginTop: 3,
      }}
    >
      <Avatar sx={{ width: 80, height: 80, m: 1.8, bgcolor: 'primary.main' }}>
        <SchoolIcon fontSize="large" />
      </Avatar>
      <Typography variant="h5" component="h2">
        Please schedule your appointments with {`${studentName}'`}s teachers.
        They look forward to meeting with you!
      </Typography>
      {teacherAppointmentSelectors}
    </Box>
  );
};
