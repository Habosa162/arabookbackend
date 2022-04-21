// const connection = async()=>{
//     const mysql = require("mysql2");
//     const con  =  await mysql.createConnection({
//         host :"127.0.0.1",
//         user:"root",
//         password:"root",
//         database:"openbook"
//     })

//     con.connect((err)=>{
//         if(err){throw err}else{
//             console.log("___________________THE CONNECTION WITH DATABASE WORKS____________________");
//         }
//     })


//     module.exports = con ;   
// }
// connection()


    const mysql = require("mysql2");


    const con  = mysql.createConnection({
        host :"127.0.0.1",
        user:"root",
        password:"root",
        database:"openbook"
    })

    con.connect((err)=>{
        if(err){throw err}else{
            console.log("___________________THE CONNECTION WITH DATABASE WORKS____________________");
        }
    })


    module.exports = con ;   




