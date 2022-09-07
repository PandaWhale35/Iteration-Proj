const express = require('express');
const router = express.Router();

//insert parent controller
const parentController = require('../controllers/parentController');



///parent signup
router.post('/signup', parentController.addParent, (req, res)=>{
  return res.status(200).json(res.locals.parent);
});

//parent login
router.get('/login', parentController.getParent, (req, res) =>{
  return res.status(200).json(res.locals.parent);
});

module.exports = router;