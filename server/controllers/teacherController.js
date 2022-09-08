const Teacher = require('../models/teacherModel');

const teacherController = {};

//creates new teacher
teacherController.addTeacher = async (req, res, next) => {
  const { teacherName, password, email, teacherId} = req.body;
  console.log(req.body, 'in teacher');
  const newTeacher = await Teacher.create({
    teacherName: teacherName,
    email: email,
    password: password,
    teacherId: teacherId,
    appointment: []
  });
  res.locals.teacher = newTeacher;
  console.log(newTeacher);
  return next();
};

//logs in
teacherController.getTeacher = async (req, res, next) => {
  // const teachers = await Teacher.findOne({teacherId: 1});
  // console.log(teachers);
  // console.log(req.body)
  const {email, password} = req.body;
  
  const foundTeacher = await Teacher.findOne({email: email});
  
  if(foundTeacher.password !== password) return next({message: 'invalid password'});
  
  res.locals.teacher = foundTeacher;
  return next();
};


//get appointments
///assuming this is finding teacher available time slots by teacher id stored on parent => child then sending back name and taken slots

teacherController.getAppointments = async(req, res, next) => {
  const {teacherId} = req.body//.teacherId;

  const foundTeacher = await Teacher.findOne({teacherId: teacherId});

  res.locals.teacherinfo = {teacherName: foundTeacher.teacherName, appointments: foundTeacher.appointment};
  res.locals.teacherdoc = foundTeacher;
  
  return next();
};



/////update appointments
///gets teacher doc from get appointments middleware
///expects a type on req.body.type
//espects a time on req.body.time

teacherController.updateAppointment = async(req,res,next)=>{
  // console.log(req.body);
  const {type, teacherId, childName, parentName, time} = req.body;

  
  try{
    //if type add then push file
   
    if(type === 'add') {
      console.log('in add');
      const foundTeacher = await Teacher.updateOne({teacherId: teacherId}, {$push: {appointment: {time: time, childName: childName, parentName: parentName  } }});
      console.log(foundTeacher);
      res.locals.teacherinfo = foundTeacher;
      return next();
    }
    if (type === 'delete') {
      console.log('in delete');

 
      
      Teacher.findOneAndUpdate({ teacherId: teacherId }, { $pull: { appointment: { time: time, childName: childName, parentName: parentName } } }, { new: true })
        .then(data => res.locals.teacherinfo = data.appointment)
        .catch(err => console.log(err));

      return next();
    }
  } catch (err) {
    return next({ message: 'error making appoinment' });
  }

}







module.exports = teacherController;