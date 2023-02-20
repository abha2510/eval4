const express=require("express");
const userRouter=express.Router();
const {UserModel}=require("../Model/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")


//---------------------------------Register---------------------------

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city}=req.body;
    try {
        bcrypt.hash(password,5,async(err,secure_password)=>{
            if(err) res.send("User already exist, please login")
           else{
            const user=new UserModel({name,email,gender,password:secure_password,age,city});
            await user.save();
            res.send("New User Registered")
           }
        })
    } catch (error) {
        res.send("User already exist, please login")
    }
})

// {
//     "name":"Abha",
//     "email":"abha@gmail.com",
//     "gender":"Female",
//     "password":"abha",
//     "age":25,
//     "city":"Nagpur"
//   }
//---------------------------------Login---------------------------------


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await UserModel.find({email});
        const hashed_pass=user[0].password;
        if(user.length>0){
            bcrypt.compare(password,hashed_pass,(err,result)=>{
                if(result){
                    const token=jwt.sign({userId:user[0]._id},"masai");
                    res.send({"msg":"Login Sucessfully!!","token":token})
                }else{
                    res.send("Wrong Credential")
                }
            });
        }else{
            res.send("Wrong Credential")
        }
    } catch (error) {
        
    }
})

module.exports={userRouter}