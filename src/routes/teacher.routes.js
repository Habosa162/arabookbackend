const teacherRouter = require("express").Router(); 
const teacher = require("../Controller/teacherController") ; 
const { body, validationResult  } = require('express-validator');


teacherRouter.post('/post/course', teacher.createCourse) ; 


teacherRouter.get("/get/enrolRequests/:courseId",teacher.getEnrolRequests ) ; 


teacherRouter.put("/put/acceptStudentRequest",teacher.acceptStudentRequest ) ; 



teacherRouter.delete("/delete/refuseStudentRequest",teacher.refuseStudentRequest) ;




// upload documents /////
//start live video /////
//write in the chat



// making exam 
// create question in the questions bank 
//choose from question bank
//get the exam grades in chart


module.exports = teacherRouter ; 
