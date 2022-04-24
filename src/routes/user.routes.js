const userRouter = require("express").Router(); 

const userController = require("../Controller/userControler") ; 
const { body, validationResult  } = require('express-validator');


                                        // SIGN UP ROUTER
userRouter.post("/signup",
                                body("email").isEmail().normalizeEmail(),
                                body("name").isLength({min:3}),
                                body("password").isLength({min:8}),userController.signup);

                                        
                                
                                        // SIGN IN ROUTER



                                        
                                        
                               
                                        
                                        
userRouter.post("/signin",
                                body('email').isEmail().normalizeEmail()
                                ,body('password').isLength({ min: 8 }),userController.signin) ;
                                        
                                     




module.exports = userRouter ; 



