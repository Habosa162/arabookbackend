const db = require("../Model/databaseCon/conDb");  
const { validationResult } = require('express-validator');
const con = require("../Model/databaseCon/conDb");

// ________________________________________________________CREATE COUNTRY_______________________________________________________
const createCountry=(req,res)=>{
  try {
    const {name}= req.body
    // id varchare and the name also
    const errors  = validationResult(req) ;
    if(!errors.isEmpty()){
        res.json({
            errors:errors
        })
    }else{
        db.query(`SELECT * FROM country where name = ?`,[name],(err,[data])=>{
          if(err){
            res.send(err)
          }else{
            if(data){
              res.json({
                inserted:false,
                message:`already existed country before !`
              })
            }else{
              db.execute(`INSERT INTO country(name) VALUES(?)`,[name],(err,data)=>{
                if(err){
                  res.send(err)
                }else{
                  res.json({
                    inserted:true,
                    message:"inserted sucssefully"
                  })
                }
              })
            }
          }
       });
    }
  }catch (error) {
     res.send(
         {
            error
         }
     ) 
  }
} 



const createGradeLevel=(req,res)=>{
  try {
    const{country_id,level} = req.body ; 
    const errors  = validationResult(req) ;
    if(!errors.isEmpty()){
        res.json({
            errors:errors
        })
    }else{
      db.query(`SELECT * FROM grade_level WHERE country_id = ? AND level = ?`,[country_id,level],(err,[data])=>{
        if(err){
          res.send(
            err
          )
        }else{
          if(data){
            res.json({
              inserted:false,
              message:"this grade level is already existed"
            })
          }else{
            db.execute(`INSERT INTO grade_level(country_id,level) VALUES(?,?,?)`,[country_id,level],(err,data)=>{
              if(err){
                res.send(err);
              }else{
                res.json({
                  inserted:true,
                  message:"the grade level inserted successfully !"
                })
              }
            })
          }
        }
      })


    }
  } catch (error) {
    res.send(
      error
    )
  }
}






const createTerm=(req,res)=>{
    try{
      const{grade_id,name}=req.body;
      const errors  = validationResult(req) ;
      if(errors.isEmpty()){
        db.query(`SELECT * FROM term WHERE grade_id=? AND name = ?`,[grade_id,name],(err,[data])=>{
          if(!err){
            if(data){
              res.json({
                inserted:false,
                message:"this term id is existed before"
              })
            }else{
              db.execute(`INSERT INTO term(grade_id,name) VALUES(?,?)`,[grade_id,name],(err,data)=>{
                if(err){
                  res.send(err)
                }else{
                  res.json({
                    inserted:true,
                    message:"inserted successfully"
                  })
                }
              })
            }
          }else{
            res.send(err);
          }
        })


      }else{
        res.send(errors)
      }

    } catch (error) {
      res.send(error)
    }
}








const createSubject=(req,res)=>{
  try{
    const{term_id,name}=req.body;
    const errors  = validationResult(req) ;
    if(errors.isEmpty()){
      db.query(`SELECT * FROM subject WHERE term_id=? AND name=?`,[term_id,name],(err,[data])=>{
        if(!err){
          if(data){
            res.json({
              inserted:false,
              message:"this subject id is existed before"
            })
          }else{
            db.execute(`INSERT INTO subject(term_id,name) VALUES(?,?)`,[term_id,name],(err,data)=>{
              if(err){
                res.send(err)
              }else{
                res.json({
                  inserted:true,
                  message:"inserted successfully"
                })
              }
            })
          }
        }else{
          res.send(err);
        }
      })


    }else{
      res.send(errors)
    }

  }catch (error) {
    res.send(error)
  }

}


const createChapter=(req,res)=>{
  try{
    const{subject_id,name}=req.body;
    const errors  = validationResult(req) ;
    if(errors.isEmpty()){
      db.query(`SELECT * FROM chapter WHERE subject_id=? AND name=?`,[subject_id,name],(err,[data])=>{
        if(!err){
          if(data){
            res.json({
              inserted:false,
              message:"this chapter id is existed before"
            })
          }else{
            db.execute(`INSERT INTO chapter(subject_id,name) VALUES(?,?)`,[subject_id,name],(err,data)=>{
              if(err){
                res.send(err)
              }else{
                res.json({
                  inserted:true,
                  message:"inserted successfully"
                })
              }
            })
          }
        }else{
          res.send(err);
        }
      })

    }else{
      res.send(errors)
    }

  }catch (error) {
    res.send(error)
  }

}






const createLesson=(req,res)=>{
  try{
    const{chapter_id,name}=req.body;


    const errors  = validationResult(req) ;
    
    if(errors.isEmpty()){
      db.query(`SELECT * FROM lesson WHERE chapter_id=? AND name=?`,[chapter_id,name],(err,[data])=>{
        if(!err){
          if(data){
            res.json({
              inserted:false,
              message:"this lesson id is existed before"
            })
          }else{
            db.execute(`INSERT INTO lesson(chapter_id,name) VALUES(?,?)`,[chapter_id,name],(err,data)=>{
              if(err){
                res.send(err)
              }else{
                res.json({
                  inserted:true,
                  message:"inserted successfully"
                })
              }
            })
          }
        }else{
          res.send(err);
        }
      })
    }else{
      res.send(errors)
    }
  }catch (error) {
    res.send(error)
  }
}



module.exports={
    createCountry,
    createGradeLevel,
    createTerm,
    createSubject,
    createChapter,
    createLesson,
// __________________________________DELETE_______________________________

}