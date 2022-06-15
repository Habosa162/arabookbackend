const teacherRouter = require("express").Router(); 
const teacher = require("../Controller/teacherController") ; 
const { body, validationResult  } = require('express-validator');


teacherRouter.post('/post/course', teacher.createCourse) ; 

teacherRouter.get("/get/teacher/courses",teacher.getTeacherCourses) ; 

teacherRouter.get("/get/enrolRequests/:courseId",teacher.getEnrolRequests ) ; 

teacherRouter.put("/put/acceptStudentRequest",teacher.acceptStudentRequest ) ; 

teacherRouter.delete("/delete/refuseStudentRequest",teacher.refuseStudentRequest) ;




// upload documents /////
//start live video /////
//write in the chat



// making exam  //////adham ////////////////////

//choose from question bank

teacherRouter.post("/post/createQuestion",teacher.createQuestion)
teacherRouter.get("/get/createExam",teacher.createExam)



//get the exam grades in chart


module.exports = teacherRouter ; 
