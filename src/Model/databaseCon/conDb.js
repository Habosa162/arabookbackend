const mysql = require("mysql2");

//byyyyyyy habooooosaaaaaaaaaaaaaaaaaa
    const con  = mysql.createConnection({
        host :"127.0.0.1",
        user:"arabxbyu_administrator",
        password:"Os7l=Qj-I;b^",
        database:"arabxbyu_arabook"
    })

    con.connect((err)=>{
        if(err){throw err}else{
            console.log("___________________THE CONNECTION WITH DATABASE WORKS____________________");
        }
    })


    module.exports = con ;   




