const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
// schedule controller will be required in new separate routers
// const scheduleController = require('./controllers/scheduleController.js');

//Import new routers for parents and teachers
const parentsRouter = require('./routes/parentsRouter');
const teacherRouter = require('./routes/teacherRouter');


const PORT = 3000;
// 'mongodb://localhost/Users'
//'mongodb+srv://iteration:JL4iDUgGu4lAHrBS@iteration.b4cwddb.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect('mongodb://localhost/Users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use ('/parents', parentsRouter);
app.use ('/teacher', teacherRouter);



//------------------------get requests to send info to front end

// app.get("/", (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, "../client/index.html"));
// });

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
  console.log('in global error handler')
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
