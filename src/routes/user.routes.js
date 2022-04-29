const userRouter = require("express").Router(); 

const user = require("../Controller/userControler") ; 
const { body, validationResult  } = require('express-validator');


                                        // SIGN UP ROUTER
userRouter.post("/signup",
                                body("email").isEmail().normalizeEmail(),
                                body("name").isLength({min:3}),
                                body("password").isLength({min:8}),user.signup);

                                        
                                
                                        // SIGN IN ROUTER

                                        
                                        
userRouter.post("/signin",
                                body('email').isEmail().normalizeEmail()
                                ,body('password').isLength({ min: 8 }),user.signin) ;
                                        
        


userRouter.get("/get/gradelevel",user.getgradelevel);

userRouter.get("/get/country",user.getCountry);



module.exports = userRouter ; 



