import React from 'react';
import { Alert } from '@mui/material/';

const Error = (props) => {
  if (props.show) return (
    <Alert
      sx={{marginTop: '16px'}}
      severity="error"
    >
      {props.message}
    </Alert>
  );
};

export default Error;