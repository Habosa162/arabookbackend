const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const res = require("express/lib/response");
const { send } = require("express/lib/response");
const con  = require("../Model/databaseCon/conDb");




const createCourse =(req,res)=>{
try {
    const{title,description,teacher_id,country_id,grade_id,term_id,subject_id}=req.body ;  

    con.execute(`NSERT INTO course(title,description,teacher_id,country_id,grade_id,term_id,subject_id) VALUES(?,?,?,?,?,?,?)`,
                [title,description,teacher_id,country_id,grade_id,term_id,subject_id],(err,data)=>{
                 if(err){
                     res.send(err)
                 }else if(data){
                     res.json({
                         inserted : true
                     })
                 }
                })

} catch (error) {
    
}
} 


// function for returning the students that requested for the course 


const getEnrolRequests = (req,res)=>{
    try {
        const {course_id} = req.body ; 
        con.query(`SELECT * FROM  scr WHERE scr.course_id = ?`,[course_id],(err,data)=>{
            if(err){
                res.json({
                    error:err
                })
            }else if(data){
                res.json({
                    data
                })
            }
        })
    } catch (error) {
        res.send(error)
    }
}




const acceptStudentRequest  = (req,res)=>{
    try {
        const {user_id , course_id} = req.body ; 
        con.execute(`UPDATE enrol SET enrol.accepted_id = '${1}'   WHERE enrol.user_id = '${user_id}' AND enrol.course_id = '${course_id}' ;`
                    ,(err,data)=>{
                        if(err){
                            res.json(
                                {error:err}
                            )
                        }else if(data){
                            res.json({
                                accepted:true
                            })
                        }
                    })
    } catch (error) {
        res.send(error)
    }
}


const refuseStudentRequest  = (req,res)=>{
    try {
        const {user_id , course_id} = req.body ; 
        con.execute(`DELETE FROM enrol WHERE user_id = ? AND course_id`,[user_id,course_id],(err,data)=>{
            if(err){
                res.json({
                    error:err
                })
            }else if(data){
                res.json({
                    deleted:true
                })
            }
        })
    } catch (error) {
        res.send(error) ;
    }
}



module.exports={
    createCourse,
    getEnrolRequests,
    acceptStudentRequest,
    refuseStudentRequest
}