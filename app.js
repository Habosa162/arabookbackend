const express =  require("express");
const app =  express() ; 
const cors  = require("cors");
const logger = require("morgan");

const PORT = process.env.PORT||6500;
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(require("./src/routes/user.routes")) ;
app.use(require("./src/routes/master.routes"));
app.use(require("./src/routes/student.routes"));
app.use(require("./src/routes/teacher.routes"));
app.use(require("./src/routes/admin.routes"));




app.get("*",(req,res)=>{
    res.json({
        message:"____________________you set wrong URL____________________" 
    })
});


app.listen(process.env.PORT || PORT, () => {
    console.log(`App listening on port ${PORT}`);
});     