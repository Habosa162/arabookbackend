const db = require("../Model/databaseCon/conDb");  
const { validationResult } = require('express-validator');
const con = require("../Model/databaseCon/conDb");

// ________________________________________________________CREATE COUNTRY_______________________________________________________
const createCountry=(req,res)=>{
  try {
    const {code,name}= req.body
    const errors  = validationResult(req) ;
    if(!errors.isEmpty()){
        res.json({
            errors:errors
        })
    }else{
        db.query(`SELECT * FROM country where name = ? AND code = ?`,[name,code],(err,[data])=>{
          if(err){
            res.send(err)
          }else{
            if(data){
              res.json({
                bool:false,
                message:`already existed country before !`
              })
            }else{
              db.execute(`INSERT INTO country(code,name) VALUES(?,?)`,[code,name],(err,data)=>{
                if(err){
                  res.send(err)
                }else{
                  res.json({
                    bool:true,
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
    const{code,country_code,level} = req.body ; 
    const errors  = validationResult(req) ;
    if(!errors.isEmpty()){
        res.json({
            errors:errors
        })
    }else{
      db.query(`SELECT * FROM grade_level WHERE code = ? AND level = ?`,[code,level],(err,[data])=>{
        if(err){
          res.send(
            err
          )
        }else{
          if(data){
            res.json({
              bool:false,
              message:"this grade level is already existed"
            })
          }else{
            db.execute(`INSERT INTO grade_level(code,country_code,level) VALUES(?,?,?)`,[code,country_code,level],(err,data)=>{
              if(err){
                res.send(err);
              }else{
                res.json({
                  bool:true,
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
      const{code,grade_code,name}=req.body;
      const errors  = validationResult(req) ;
      if(errors.isEmpty()){
        db.query(`SELECT * FROM term WHERE code=?`,[code],(err,[data])=>{
          if(!err){
            if(data){
              res.json({
                bool:false,
                message:"this term code is existed before"
              })
            }else{
              db.execute(`INSERT INTO term(code,grade_code,name) VALUES(?,?,?)`,[code,grade_code,name],(err,data)=>{
                if(err){
                  res.send(err)
                }else{
                  res.json({
                    bool:true,
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
    const{code,term_code,name}=req.body;
    const errors  = validationResult(req) ;
    if(errors.isEmpty()){
      db.query(`SELECT * FROM subject WHERE code=?`,[code],(err,[data])=>{
        if(!err){
          if(data){
            res.json({
              bool:false,
              message:"this subject code is existed before"
            })
          }else{
            db.execute(`INSERT INTO subject(code,term_code,name) VALUES(?,?,?)`,[code,term_code,name],(err,data)=>{
              if(err){
                res.send(err)
              }else{
                res.json({
                  bool:true,
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
    const{code,subject_code,name}=req.body;
    const errors  = validationResult(req) ;
    if(errors.isEmpty()){
      db.query(`SELECT * FROM chapter WHERE code=?`,[code],(err,[data])=>{
        if(!err){
          if(data){
            res.json({
              bool:false,
              message:"this chapter code is existed before"
            })
          }else{
            db.execute(`INSERT INTO chapter(code,subject_code,name) VALUES(?,?,?)`,[code,subject_code,name],(err,data)=>{
              if(err){
                res.send(err)
              }else{
                res.json({
                  bool:true,
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
    const{code,chapter_code,name}=req.body;
    const errors  = validationResult(req) ;
    if(errors.isEmpty()){
      db.query(`SELECT * FROM lesson WHERE code=?`,[code],(err,[data])=>{
        if(!err){
          if(data){
            res.json({
              bool:false,
              message:"this lesson code is existed before"
            })
          }else{
            db.execute(`INSERT INTO lesson(code,chapter_code,name) VALUES(?,?,?)`,[code,chapter_code,name],(err,data)=>{
              if(err){
                res.send(err)
              }else{
                res.json({
                  bool:true,
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




const listCountry=(req,res)=>{
  try {
    db.query(`SELECT * FROM country`,(err,data)=>{
      if(!err){
        if(data.length>0){
          res.json({
            country:data
          })
        }else{
          res.json({
            message:"there is no countries has created yet !"
          })
        }
      }else{
        res.send(err)
      }
    })
  } catch (error) {
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
// _________________________________________________________________
    listCountry
}