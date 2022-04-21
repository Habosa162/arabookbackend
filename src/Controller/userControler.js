const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const con  = require("../Model/databaseCon/conDb");



                                                // SIGN UP CONROLLER
const signup = (req, res) => {
    try {
        const {  email, password, name,role_id, country_id ,gender_id} = req.body
        const errors = validationResult(req);
        const saltRounds = 1;
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }else {
              con.query(`SELECT * FROM user where user.email ='${email}'`,(err, [data])=>{
               
                if (err){ throw err;}
                else {
                    if (!data) {
                        bcrypt.genSalt(saltRounds, function (err, salt) {
                            if (err) { throw err; } else {
                                bcrypt.hash(password, salt, function (err,hash) {
                                    if (err) {
                                        throw err;
                                    } else {
                                        // _______________________________________________________STUDENT INSTERTAION____________________________________________________
                                         con.execute(`INSERT INTO user(name,email,password,role_id,country_id,gender_id) 
                                                           VALUES('${name}','${email}','${hash}','${role_id}' ,'${country_id}','${gender_id}')`,(err,data) => {
                                            if (!err) {
                                                // console.log(err) ; 
                                                res.send({
                                                    inserted: true
                                                });
                                            } else {
                                                console.log(err) ;
                                                res.send({
                                                    inserted: false
                                                });
                                            }
                                        });

                                    }
                                });
                            }

                        });
                    } else {
                        res.json(`${email} is exist before`);
                    }


                }
            }
            )

        }
    } catch (error) {
        // throw error
        console.log(error);
        res.json({
            "error " :error
        })
    }
}
                                                 // SIGN IN CONROLLER
const signin=(req, res) => {
    try {
        const { email, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }else{
        con.query(`SELECT * FROM users_v WHERE email = '${email}'`, (err, [data]) => {
            if (err) {
                throw err;
            }
            else {
                if (data){
                    //++++++++++++++++++++++ THEN THE EMAIL IS EXIST ++++++++++++++++++++++++
                    try {
                        const match = bcrypt.compareSync(password, data.password);

                        if (match){  //user_result = TRUE
                                let tokenResponse = jwt.sign({id: data.id
                                                             ,email:data.email
                                                             ,name:data.name
                                                             ,role:data.role
                                                             ,isLoggedIn: true },"Habosa");

                                res.send({ token: tokenResponse, message: "Success" });
                            } 

                         else {
                            res.send({ message: "Wrong password" })
                        }
                        console.log(data);
                    } catch (error) { throw error }
                }else {
                    res.send({ message: "This Email Address Is Not Exist" });

                }

            }
        })

    }}catch (error) {
        throw error
    }



}

module.exports = {
    signup,
    signin
}
