const Teacher = require('../models/teacherModel');

const teacherController = {};

//creates new teacher
teacherController.addTeacher = async (req, res, next) => {
  const { teacherName, password, email, teacherId} = req.body;
  
  const newTeacher = await Teacher.create({
    teacherName: teacherName,
    email: email,
    password: password,
    teacherId: teacherId
  },(err)=>{
    if(err) return next({message: `${err}: error occured while creating teacher`});
  });
  res.locals.teacher = newTeacher;
  return next();
};

//logs in
teacherController.getTeacher = async (req, res, next) => {

  const {email, password} = req.body;
  
  const foundTeacher = await Teacher.findOne({email: email}, (err, teacher)=>{
    if(err || teacher === null) return next({message: `${err} invalid email, error finding teacher`});
  });
  
  if(foundTeacher.password !== password) return next({message: 'invalid password'});
  
  res.locals.teacher = foundTeacher;
  return next();
};


//get appointments
///assuming this is finding teacher available time slots by teacher id stored on parent => child then sending back name and taken slots

teacherController.getAppointments = async(req, res, next) => {
  const {teacherId} = req.body;

  const foundTeacher = await Teacher.findOne({teacherId: teacherId},(err, teacher)=>{
    if(err || teacher === null) return next({message: `${err} invalid teacher id, error finding teacher`});
  });

  res.locals.teacherinfo = {teacherName: foundTeacher.teacherName, appointments: foundTeacher.appoinment};
  res.locals.teacherdoc = foundTeacher;
  return next();
};



/////update appointments
///gets teacher doc from get appointments middleware
///expects a type on req.body.type
//espects a time on req.body.time

teacherController.updateAppointment = async(req,res,next)=>{
    const {type} = req.body.type;
    const {appointment} = res.locals.teacherdoc;

    ///if type delete pull file

    //if type push than push file



    //send updated teacher info
    //res.locals.teacherinfo = name & updated appointments
}






module.exports = teacherController;