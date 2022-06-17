const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const res = require("express/lib/response");
const { send } = require("express/lib/response");
const con  = require("../Model/databaseCon/conDb");
const jwt_decode = require("jwt-decode") ;



const createCourse =(req,res)=>{
try {
    const{title,description,teacher_id,country_id,grade_id,term_id,subject_id}=req.body ;  

    con.execute(`INSERT INTO course(title,description,teacher_id,country_id,grade_id,term_id,subject_id) VALUES(?,?,?,?,?,?,?)`,
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




const getTeacherCourses = (req,res)=>{
    try {
        const {token} = req.headers;
        const user  = jwt_decode(token) ; 
        console.log(user.data.id)
        con.query(`SELECT * FROM  course WHERE teacher_id = ?`,[user.data.id],(err,data)=>{
            if(err){
                res.json({
                    error:err
                })
            }else if(data){
                res.json({
                    courses:data
                })
            }
        })
    } catch (error) {
        res.send(error)
    }
}






// function for returning the students that requested for the course 


const getEnrolRequests = (req,res)=>{
    try {
        const {courseId} = req.params ; 
        con.query(`SELECT * FROM  scr WHERE scr.course_id = ?`,[courseId],(err,data)=>{
            if(err){
                res.json({
                    error:err
                })
            }else if(data){
                res.json({
                    response:true,
                    requests:data
                })
            }
        })
    } catch (error) {
        res.send(error)
    }
}




const acceptStudentRequest  = (req,res)=>{
    try {
        const {id} = req.body ; 
        con.execute(`UPDATE enrol SET enrol.accepted_id = '${1}' WHERE enrol.id = '${id}';`
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
        const id = req.body ; 
        con.execute(`DELETE FROM enrol WHERE id = ? `,[id],(err,data)=>{
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



//////////////////////adham///////////////////////////////


const createExam = (req,res)=>{

    try {

        const { id } = req.params;
        const { course_id } = req.params;
        con.query(`SELECT * FROM question_bank WHERE subject_id = '${course_id}' AND id = '${id}'`,(err ,data)=>{

                if(!err){
                            res.json({
                                    question:data
                            })
                }
                else{
                    res.send(err)
                }
        })

    } catch (err) {
        res.send(err)
    }
}



const createQuestion = (req,res)=>{

    try {

            con.execute(`INSERT INTO question_bank(course_id,question,ans1,ans2,ans3,ans4,correct_ans) 
            Values('${course_id}','${question}','${ans1}','${ans2}' ,'${ans3}' ,'${ans4}' ,'${correct_ans}') `
            ,(err, data)=>{

                if(!err){

                    res.send({
                        inserted: true
                    })


                }else{
                    res.send(err)
                }
            })
        
    } catch (err) {
        
        res.send(err)
    }
}


module.exports={
    createCourse,
    getTeacherCourses,
    getEnrolRequests,
    acceptStudentRequest,
    refuseStudentRequest,
    createQuestion,
    createExam
}