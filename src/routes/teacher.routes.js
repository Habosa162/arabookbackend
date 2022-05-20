const teacherRouter = require("express").Router(); 
const teacher = require("../Controller/teacherController") ; 
const { body, validationResult  } = require('express-validator');


teacherRouter.post('/post/course', teacher.createCourse) ; 

teacherRouter.get("/get/enrolRequests",teacher.getEnrolRequests ) ; 


teacherRouter.put("/put/acceptStudentRequest",teacher.acceptStudentRequest ) ; 


// delete student request

module.exports = teacherRouter ; 
