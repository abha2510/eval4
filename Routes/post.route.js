const express=require("express");
const {PostModel}=require("../Model/post.model");
const postRouter=express.Router();

postRouter.get("/",async(req,res)=>{
    const query={};
    if(req.params.device){
       query.device=req.query.device
    }
    const Id=req.body.userId
    try {
        const posts=await PostModel.find({...query,userId:Id});
        res.send(posts)
    } catch (error) {
        res.send({"msg":"Something went wrong","error":error})
    }
});


postRouter.post("/createpost",async(req,res)=>{
    const payload=req.body;
    try {
        const post=new PostModel(payload);
        await post.save();
        res.send("Post has been created")
    } catch (error) {
        res.send({"msg":"Something went wrong","error":error})
    }
});


postRouter.patch("/update/:id",async(req,res)=>{
const payload=req.body;
const id=req.params.id;
let post=await PostModel.findOne({"_id":id});
const userId_in_post=post.userId;
const userId_making_req=req.body.userId;

try {
    if(userId_making_req!==userId_in_post){
        res.send({"msg":"You rae not Authorized"})
    }else{
        await PostModel.findByIdAndUpdate({"_id":id},payload);
        res.send("Post has been updated")
    }
} catch (error) {
    res.send({"msg":"Something went wrong","error":error})
}
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    let post=await PostModel.findOne({"_id":id});
    const userId_in_post=post.userId;
    const userId_making_req=req.body.userId;
    
    try {
        if(userId_making_req!==userId_in_post){
            res.send({"msg":"You rae not Authorized"})
        }else{
            await PostModel.findByIdAndDelete({"_id":id});
            res.send("Post has been deleted")
        }
    } catch (error) {
        res.send({"msg":"Something went wrong","error":error})
    }
    })

module.exports={postRouter}