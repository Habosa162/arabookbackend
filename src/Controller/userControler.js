const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const res = require("express/lib/response");
const { send } = require("express/lib/response");
const con = require("../Model/databaseCon/conDb");
const jwt = require("jsonwebtoken");



// SIGN UP CONROLLER
const signup = (req, res) => {
    try {
        const { email, password, name, role_id, country_id, gender_id } = req.body
        const errors = validationResult(req); 4
        const saltRounds = 1;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            con.query(`SELECT * FROM user where user.email ='${email}'`, (err, [data]) => {

                if (err) { throw err; }
                else {
                    if (!data) {
                        bcrypt.genSalt(saltRounds, function (err, salt) {
                            if (err) { throw err; } else {
                                bcrypt.hash(password, salt, function (err, hash) {
                                    if (err){
                                        throw err;
                                    } else {


                                        console.log(`${name},'${email}','${hash}',${role_id} ,${country_id},${gender_id})`)
                                        // _______________________________________________________STUDENT INSTERTAION____________________________________________________
                                        con.execute(`INSERT INTO user(name,email,password,role_id,country_id,gender_id) 
                                                           VALUES('${name}','${email}','${hash}',${role_id} ,${country_id},${gender_id})`, (err, data) => {
                                            if (!err) {
                                                // console.log(err) ; 
                                                res.send({
                                                    inserted: true
                                                });
                                            } else {
                                                console.log(err);
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
            "error ": error
        })
    }
}




// SIGN IN CONROLLER
const signin = (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`the email ${email} and password is ${password} `);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "im error from habosaaaaaaaaa", errors: errors.array() });
        } else {
            con.query(`SELECT * FROM users_v WHERE email='${email}' `, (err, [data]) => {
                if (err) {
                    res.json({ message: "im the eroorrrrrrrrrrrrrrrrrrrrrrrrrrrr", error: err });
                }
                else {
                    // console.log(data) ;
                    if (data) {
                        //++++++++++++++++++++++ THEN THE EMAIL IS EXIST ++++++++++++++++++++++++
                        try {
                            const match = bcrypt.compareSync(password, data.password);

                            if (match) {  //user_result = TRUE
                                console.log(data) ;
                                let tokenResponse = jwt.sign({
                                    data
                                    , isLoggedIn: true
                                }, "Habosa");

                                // console.log({ token: tokenResponse, message: "Success" })
                                res.json({ token: tokenResponse, auth: true, message: "Success" });
                            }
                            else {
                                res.json({ auth: false, message: "Wrong password" })
                            }
                        } catch (error) { res.send(error) }
                    } else {
                        res.send({ message: "This Email Address Is Not Exist" });

                    }

                }


            })

        }
    } catch (error) {
        res.send(error)
    }



}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
const getRole = (req, res) => {

    try {

        con.query(`SELECT * FROM role WHERE name != 'master' and name !='admin'`, (err, data) => {

            if (!err) {

                res.json({

                    role: data
                })
            }
            else {
                res.send(err)
            }

        })

    } catch (err) {
        res.send(err)
    }

}
/////////////////////////////////////////////////////

const getGender = (req, res) => {

    try {
        con.query('SELECT * FROM gender', (err, data) => {

            if (!err) {

                res.json({

                    gender: data
                });
            }

            else {
                res.send(err)
            }
        })

    } catch (err) {

        res.send(err)

    }

}




// ___________________________________________________________AFTER LOGIN____________________________________________________________

const getCountry = (req, res) => {
    try {
        con.query(`SELECT * FROM country`, (err, data) => {
            if (!err) {
                if (data.length > 0) {
                    res.json({
                        country: data
                    })
                } else {
                    res.json({
                        message: "there is no countries has created yet !"
                    })
                }
            } else {
                res.send(err)
            }
        })
    } catch (error) {
        res.send(error)
    }
}


const getgradelevel = (req, res) => {
    try {
        const { country } = req.params ;

        // console.log(country);

        con.execute(`SELECT * FROM grade WHERE country_id='${country}'`, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                // console.log(data) ;
                res.json({
                    grade: data
                })
            }
        })
    } catch (error) {
        res.send(error)
    }
}




const geterm = (req, res) => {
    try {
        const { gradeid } = req.params;
        con.query(`SELECT * FROM term WHERE grade_id ='${gradeid}'`, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.json({
                    term: data
                })
            }
        })
    } catch (error) {
        res.send(error)
    }
}


const getsubject = (req, res) => {
    try {
        const { termid } = req.params;
        con.query(`SELECT * FROM subject WHERE term_id='${termid}'`, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.json({
                    subject: data
                })
            }
        })
    } catch (error) {
        res.send(error);
    }
}



const getchapter = (req, res) => {
    try {
        const { subjectid } = req.params;
        con.query(`SELECT * FROM chapter WHERE subject_id	 = ${subjectid}`, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    chapter: data
                })
            }
        })
    } catch (error) {
        res.send(error)
    }
}


const getlesson = (req, res) => {
    try {
        const { chapterid } = req.params;

        con.query(`SELECT * FROM lesson WHERE chapter_id = '${chapterid}'`, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.json({
                    lesson: data
                })
            }
        })
    } catch (error) {
        res.send(error)
    }
}




const getsection = (req, res) => {
    try {
        const { lessonid } = req.params;

        con.query(`SELECT * FROM section WHERE lesson_id = '${lessonid}' AND accepted='${1}'`, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.json({
                    section: data
                })
            }
        })
    } catch (error) {
        res.send(error)
    }
}





const requestSection = (req, res) => {
    try {

    } catch (error) {
        res.send(error);
    }
}


const sendMessage = (req , res ) => {
try {
    const {course_id} = req.params ;
    const {user_id,message} = req.body
    con.execute(`INSERT INTO messages(user_id,course_id,message,datetime)
     Values('${user_id}','${course_id}','${message}','${datetime}')` , (err ,data) =>{
        if (!err) {
            res.send({
                inserted: true
            });
        } else {
            console.log(err);
            res.send({
                inserted: false
            });
        }
    })
  
} catch (err) {
    res.send(err)
}
}






const getMessage = (req, res) =>{

try {
    
    // const { datetime } = req.params;
    const { course_id } = req.params;



    con.query(`SELECT * FROM messages WHERE course_id = '${course_id}'  ORDER BY datetime` ,(err,data)=>{

        if(err){
            res.send(err);

        }  else{
            res.json({
                message: data
            })

        }
    })

} catch (err) {
    res.send(err)
}

}








module.exports = {
    signup,
    signin,
    getCountry,
    getgradelevel,
    geterm,
    getsubject,
    getchapter,
    getlesson,
    getsection,
    getRole,
    getGender,
    sendMessage,
    getMessage
}
