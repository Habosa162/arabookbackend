const studentRouter = require("express").Router(); 
const student = require("../Controller/studentController") ; 
const { body, validationResult  } = require('express-validator');


studentRouter.post("/enrolcourse",student.enrolCourse) ; 



module.exports = studentRouter ; 
