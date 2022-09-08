const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://iteration:JL4iDUgGu4lAHrBS@iteration.b4cwddb.mongodb.net/?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.connection.once('open', () => {
//   console.log('Connected to Database');
// });

const Schema = mongoose.Schema;

//teacherupdate
const teacherSchema = new Schema ({
  teacherName: {type: String, required: true},
  teacherId: { type: Number, required: true },
  email: { type: String, required: true },
  password: {type: String, required: true},
  //make this appointment slot an object. This way, on a post request from the parent trying to create an appointment, we know what time they selected and who is selecting it?
  appointment: [ {
    time : String , 
    childName: String, 
    parentName: String }
  ]
});

const Teacher =  mongoose.model('teacher', teacherSchema);

module.exports =  Teacher;

