const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require ('path');
const scheduleController = require ('./controllers/scheduleController.js');

const PORT = 3000;

//mongoose.connect(/*link goes here -->*/'', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const scheduleRouter = express.Router();
// app.use('/', scheduleRouter);

//------------------------get requests to send info to front end
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/stylesheets/styles.scss', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../stylesheets/style.scss'));
});

app.get('/dist/bundle.js', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../dist/bundle.js'));
});


// // http://localhost:3000/controller1
// scheduleRouter.get('/', scheduleController.controller1,(req,res)=>{
//   return res.status(200).json(res.locals.student);
// });

// // http://localhost:3000/controller2
// scheduleRouter.post('/', scheduleController.controller2, (req,res)=>{
//   return res.status(200).json(res.locals.student);
// });

// // http://localhost:3000/controller3
// scheduleRouter.patch('/', scheduleController.controller3, (req,res)=>{
//   return res.sendStatus(200);
// });

// // http://localhost:3000/controller4
// scheduleRouter.delete('/', scheduleController.controller4, (req,res)=>{
//   return res.sendStatus(200);
// });

// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));