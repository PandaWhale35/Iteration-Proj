const { ParentUser: Parent }  = require('../models/parentModel');


const parentController = {};

//finds parent prepopulated in data base and updates name/password
parentController.addParent = async (req, res, next) => {
  try {
    const { parentName, password, email} = req.body;
    const newParent = await Parent.findOneAndUpdate({email: email}, {parentName: parentName, password: password});
    res.locals.parent = newParent;
    return next();
  } catch (err){
    return next({
      log: err,
      status: 400,
      message: 'error when adding parent'
    });
  }
};

//finds parent by email and checks if password matches
parentController.getParent = async (req, res, next) => {
  console.log('Starting .getParent')
  try{
    console.log(req.body, 'req body');
    const {email, password} = req.body;
    const foundParent = await Parent.findOne({email: email});
    // console.log(foundParent);

    if(foundParent.password !== password) return next({message: 'invalid password'});

    res.locals.parent = foundParent;
    return next();
  } catch (err){
    return next({
      log: err,
      status: 400,
      message: 'error getting parent'});
  }
};






module.exports = parentController;