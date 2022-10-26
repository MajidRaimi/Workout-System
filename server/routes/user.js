const express = require('express') ; 

const {loginUser , signupUser } = require('../controllers/userControllers.js') ; 

const router = express.Router() ;


// login router 
router.post('/login' , loginUser)




// signup
router.post('/signup' , signupUser)




module.exports = router ;  