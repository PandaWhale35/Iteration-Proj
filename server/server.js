const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
// schedule controller will be required in new separate routers
// const scheduleController = require('./controllers/scheduleController.js');

//Import new routers for parents and teachers
const parentRouter = require('./routers/parentRouter');
const teacherRouter = require('./routers/teacherRouter');


const PORT = 3000;

// update with new remote MongoDB
mongoose.connect('mongodb://localhost:27017/addressed', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use ('/parents')
// No longer using scheduleRouter
// const scheduleRouter = express.Router();
// app.use('/api', scheduleRouter);

//------------------------get requests to send info to front end


//I don't think the following 3 gets are needed
// app.get('/', (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
// });

// app.get('/stylesheets/style.scss', (req, res) => {
//   return res
//     .status(200)
//     .sendFile(path.join(__dirname, '../stylesheets/style.scss'));
// });

// app.get('/dist/bundle.js', (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, '../dist/bundle.js'));
// });

// scheduleRouter.get("/frontPage", (req, res) => {
//   res.status(200).json(res.locals.studentInfo);
// });

// post requests ----------
//ERROR PLEASE FIX
// scheduleRouter.post('/login', scheduleController.controller1,(req,res)=>{

//   return res.redirect('/frontPage');

// });

// Move to parents and teacher router. 
// Separate signup for teachers and parents
// scheduleRouter.post(
//   '/signup',
//   scheduleController.idAuthentication,
//   (req, res) => {
//     return res.status(200).json(res.locals.student);
//   }
// );

//Worked with 3000/api/teachers!
//Move to teachers router. Is add teacher necessary for MvP?
// scheduleRouter.post('/teachers', scheduleController.addTeacher);
// scheduleRouter.get('/teachers', scheduleController.getTeachers);

// Move to parents router
// scheduleRouter.get('/parents', scheduleController.getParents);
//Parents Login and Signup

// scheduleRouter.post('/parents/signup', scheduleController.parentSignup);
// scheduleRouter.post('/parents/login', scheduleController.parentLogin);
// // scheduleRouter.get("/parents/signup", scheduleController.parentSignup);
// scheduleRouter.get('/parents/login', scheduleController.parentLogin);

//Create new student

//Confirm we're no longer doing a student router
// scheduleRouter.post('/students', scheduleController.addStudent);

// scheduleRouter.get('/students', scheduleController.getStudents);

// // http://localhost:3000/controller3
// scheduleRouter.patch('/', scheduleController.controller3, (req,res)=>{
//   return res.sendStatus(200);
// });

// // http://localhost:3000/controller4
// scheduleRouter.delete('/', scheduleController.controller4, (req,res)=>{
//   return res.sendStatus(200);
// });

// Unknown route handler
app.use((req, res) => {
  console.log('Unknown route');
  res.sendStatus(404);
});

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
