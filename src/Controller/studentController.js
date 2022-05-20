const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const res = require("express/lib/response");
const { send } = require("express/lib/response");
const con  = require("../Model/databaseCon/conDb");




const enrolCourse = (req,res)=>{
    try {
        const {user_id,course_id} = req.body
        con.execute(`INSERT INTO enrol(user_id,course_id) VALUES(?,?)`,[user_id,course_id],(err,data)=>{
            if(err){
                res.json({
                    error:err
                })
            }else if(data){
                res.json({
                    inserted:true
                })
            }
        })
    } catch (error) {
        
    }
}




module.exports = {
    enrolCourse
}