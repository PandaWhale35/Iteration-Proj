const express = require('express');
const router = express.Router();

//insert parent controller
const parentController = require('../controllers/parentController');



///parent signup
router.post('/signup', parentController.addParent, (req, res)=>{
  return res.status(200).json(res.locals.parent);
});

//parent login
router.post('/login', parentController.getParent, (req, res) =>{
  console.log('hello from parent login');
  return res.status(200).json(res.locals.parent);
});

module.exports = router;
