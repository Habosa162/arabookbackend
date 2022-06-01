const studentRouter = require("express").Router(); 
const student = require("../Controller/studentController") ; 
const { body, validationResult  } = require('express-validator');


studentRouter.post("/enrolcourse",student.enrolCourse) ; 

////download documnets from the course
////exit course 
////add comments for him self on the lessons or video section

//solve the exam 
//sumbit exam
//create Room
//write in the chat 


module.exports = studentRouter ; 
