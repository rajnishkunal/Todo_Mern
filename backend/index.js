import express from "express";
import AuthRoute from "./routes/auth.js"
import TodoRoute from "./routes/todo.js"
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path"

const app=express();
const PORT =3000;

const _dirname=path.resolve();

dotenv.config();

const corsOptions={
    origin:"https://todo-mern-j4xc.onrender.com/",
    credentials:true,
}
app.use(cors(corsOptions));   
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/api/user",AuthRoute);
app.use("/api/todos",TodoRoute);

// app.get("/",(req,res,next)=>{
//     res.send("Hello World");
// });

//gloabal error handler
app.use((err,req,res,next)=>{
    const statusCode =err.statusCode || 500;
    const message=err.message || "Internal server error";
    res.status(statusCode).json({error:message});
});

app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})
