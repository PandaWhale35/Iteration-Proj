import React from 'react';
import { Box, Typography, Avatar, AppBar, List, ListItem, ListItemText } from '@mui/material/';
import SchoolIcon from '@mui/icons-material/School';
import { useSelector } from 'react-redux';
import { AppointmentSelectorDisplay } from '../components/AppointmentSelectorDisplay';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

export const TeacherContainer = (props) => {
 
  const teacherData = useSelector((state)=> state.schedule.teacherData);
  const teacherName = useSelector((state)=> state.schedule.teacherName);
  const teacherId = useSelector((state)=> state.schedule.teacherId);
  const [teacherState, setTeacherState] = useState(teacherData);
  
  function onClick(e){
    e.preventDefault();
    const index = e.target.id
    let array = [...teacherState];
    const apptObj = teacherState[e.target.id]
    console.log('teacherId', teacherId);
   
    const body = {
      type: 'delete',
      teacherId: teacherId,
      childName:  apptObj.childName ,
      parentName:   apptObj.parentName  ,
      time:   apptObj.time   ,
    }
    array.splice(index, 1)
    console.log(array.length)
    console.log('teacherState', teacherState)
    if(array.length === 0) setTeacherState([]);
    
    else {setTeacherState(array)}
    console.log('teacherState', teacherState);
    fetch('/teacher/updatetimes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    // .then(res => res.json())
    .then(res => {
      console.log('response', res);
    })
    .catch(err => {
      console.log(err);
    })

  }

  const teacherAppointments = [];
  teacherState.forEach((appointment, i)=> {
    teacherAppointments.push(
      <form id={i} onSubmit={onClick}>
     <ListItem key={i} sx={{
      display: 'flex',
      justifyContent: 'space-evenly',
     }}>
      <ListItemText
        primary = 'Time'
        secondary= {appointment.time}/>
      <ListItemText
        primary = 'Student Name'
        secondary= {appointment.childName}/>
      <ListItemText
        primary = 'Parent Name'
        secondary= {appointment.parentName}/>
        <IconButton edge="end" aria-label="delete" id={i} type='submit'>
                      <DeleteIcon />
                    </IconButton>

     </ListItem>
     </form>
    )
  });

  return (
    <Box
      sx={{
        width: 700,
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
      <Typography variant="h3" component="h2">
       Welcome {teacherName}
      
      </Typography>
      <Typography variant="h5" component="h2">
      Your Scheduled Appointments
      
      </Typography>
      <List width= "100%">
      {teacherAppointments}
      </List>
    </Box>
  );
};
