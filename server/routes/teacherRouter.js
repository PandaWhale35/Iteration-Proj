const express = require('express');
const router = express.Router();

//insert teacher controller
const teacherController = require('../controllers/teacherController');



///teacher signup
router.post('/signup', teacherController.addTeacher, (req, res)=>{
  return res.status(200).json(res.locals.teacher);
});

//teacher login
router.post('/login', teacherController.getTeacher, (req, res) =>{
  return res.status(200).json(res.locals.teacher);
});

//find teacher
router.post('/findteacher', teacherController.getAppointments, (req, res) =>{
  return res.status(200).json(res.locals.teacherinfo);
});


router.post('/updatetimes', teacherController.updateAppointment, (req, res)=>{
  return res.status(200).json(res.locals.teacherinfo);
});




module.exports = router;