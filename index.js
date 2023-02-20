const express=require("express");
const {connection} =require("./db");
const {userRouter}=require("./Routes/user.route");
const {postRouter}=require("./Routes/post.route");
const {authenticate}=require("./middleware/authenticate.middleware")
require("dotenv").config();
const app=express();

app.use(express.json());

app.get("/",(req,res)=>{
   res.send("Welcom To Linkedin App")
})

app.use("/users",userRouter);
app.use(authenticate);
app.use("/posts",postRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB!!!!")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`Server Running at port ${process.env.port}`);
})