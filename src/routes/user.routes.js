const userRouter = require("express").Router(); 
const user = require("../Controller/userControler") ; 
const { body, validationResult  } = require('express-validator');


                                        // SIGN UP ROUTER
userRouter.post("/signup",
                                body("email").isEmail().normalizeEmail(),
                                body("name").isLength({min:3}),
                                body("password").isLength({min:8}),user.signup);

                                        
                                
                                        // SIGN IN ROUTER
                                        
userRouter.post("/signin",body('email').isEmail().normalizeEmail()
                         ,body('password').isLength({ min: 8 })  ,  user.signin) ;




                                       //messages router 

userRouter.post("/messages/:course_id",user.sendMessage) ;

userRouter.get("/get/messages/:course_id",user.getMessage);


                         ////////////////////////////////////////

                                   
 userRouter.get("/get/role",user.getRole);

userRouter.get("/get/country",user.getCountry);
userRouter.get("/get/gender",user.getGender);

userRouter.get("/get/grade/:country",user.getgradelevel);


userRouter.get("/get/term/:gradeid",user.geterm) ; 

////////////////////////////////////////////////////////////////////////////////////////////NEEED TESTING 

userRouter.get("/get/subject/:termid",user.getsubject) ;

userRouter.get("/get/chapter/:subjectid",user.getchapter) ; 

userRouter.get("/get/lesson/:chapterid",user.getlesson) ; 

userRouter.get("/get/section/:lessonid",user.getsection) ; 

//////exam


module.exports = userRouter ; 



