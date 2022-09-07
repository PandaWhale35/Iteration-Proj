const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//teacherupdate
const teacherSchema = new Schema ({
  teacherName: {type: String, required: true},
  teacherId: { type: Number, required: true },
  email: { type: String, required: true },
  password: {type: String, required: true},
  //make this appointment slot an object. This way, on a post request from the parent trying to create an appointment, we know what time they selected and who is selecting it?
  appointment: [ {time : {type: String, unique: true} , 
    childName: String, 
    parentName: String }
  ]
});



module.exports = mongoose.model('teacher', teacherSchema);
