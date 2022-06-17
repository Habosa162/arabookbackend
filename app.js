const express =  require("express");
const app =  express() ; 
const cors  = require("cors");
const logger = require("morgan");
const http = require("http");
const {Server}  = require("socket.io");
const con  = require("./src/Model/databaseCon/conDb") ; 
const res = require("express/lib/response");


const PORT = process.env.PORT||6500;


const frontServer  = "http://localhost:3000"

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(require("./src/routes/user.routes")) ;
app.use(require("./src/routes/master.routes"));
app.use(require("./src/routes/student.routes"));
app.use(require("./src/routes/teacher.routes"));




app.get('/', (req, res) => {
    res.send("this is the home pageeeeeeeeeeeeeeeee");
}); 
app.get("*",(req,res)=>{
    res.json({
        message:"____________________you set wrong URL____________________" 
    })
});
//////////////////////////////////////////////

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));





// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//////////////////////////////////////////////




const server = http.createServer(app)

 const io = new Server(server,{
    cors:{
        origin : "http://localhost:3000",
        methods : ["GET","POST"]
    }
}) ;





io.on("connection",(socket)=>{
    console.log(`user connected ${socket.id}`);




    socket.on("InputMessage", msg => {
        console.log("im hereeeeeeeeeee")
        try {
            con.execute(`insert into messages(user_id,course_id,message,datetime) VALUES(?,?,?,?)`,[msg.user,msg.course_id,msg.message,msg.date]
            ,(err,data)=>{
                if(!err){
                    res.json({
                        inserted:true,
                        err:false
                    })
                }
            })
        } catch (error) {
            res.json({
                inserted:false,
                err:true
            })
        }
    })













    socket.on("disconnect",()=>{
         console.log("user is disconnected",socket.id);
    })


})





server.listen(process.env.PORT || PORT, () => {
    console.log(`App listening on port ${PORT}`);
});     