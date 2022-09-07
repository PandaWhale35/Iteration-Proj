const Parent = require('../models/parentModel');


const parentController = {};

//finds parent prepopulated in data base and updates name/password
parentController.addParent = async (req, res, next) => {
  const { parentName, password, email} = req.body;

  const newParent = await Parent.findOneAndUpdate({email: email}, {parentName: parentName, password: password},(err)=>{
    if(err) return next({message: `${err}: error occured while creating parent`});
  });
  res.locals.parent = newParent;
  return next();
};

//finds parent by email and checks if password matches
parentController.getParent = async (req, res, next) => {

  const {email, password} = req.body;

  const foundParent = await Parent.findOne({email: email}, (err, parent)=>{
    if(err || parent === null) return next({message: `${err} invalid email, error finding parent`});
  });

  if(foundParent.password !== password) return next({message: 'invalid password'});

  res.locals.parent = foundParent;
  return next();
};






module.exports = parentController;