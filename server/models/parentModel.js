const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Joi is considered one of the most powerul schema desceiption language and DATA vlidator for JS.
//Read more here : https://www.npmjs.com/package/joi
const Joi = require("joi");
//passwordComplexity creates a joi object  https://www.npmjs.com/package/joi-password-complexity where
//we can set different requirement fields for our username, password.
const passwordComplexity = require("joi-password-complexity");
//JSON webtoken - Read more about here https://www.npmjs.com/package/jsonwebtoken  (Remember, not recommended to use alone as a validator)
const jwt = require("jsonwebtoken");

const parentSchema = new Schema({
  parentName: { type: String, required: true },
  email: { type: String, required: true }, //How can we implement username?
  password: { type: String, required: true },
  childInfo: [{ 
    childName: { type: String, required: true },
    studentId: { type: Number, required: true },
    teacherId : {type: Number, required: true}
  }],
});
//https://www.ibm.com/docs/en/aix/7.2?topic=files-env-file about.ENV
parentSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: '14d',
  });
  return token;
};

const ParentUser = mongoose.model('parent', parentSchema);

const validate = (data) => {
  const schema = Joi.object({
    // firstName: Joi.string().label("First Name"),
    //lastName: Joi.string().label("Last Name"),
    email: Joi.string().email().required().label('email'),
    password: passwordComplexity().required().label('password'),
    studentId: Joi.string().required().label('student id'),
  });
  //WE HAVE TO CONSOLE.LOG THIS
  return schema.validate(data);
};

module.exports = { ParentUser, validate };
