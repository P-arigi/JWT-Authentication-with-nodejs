const express = require("express")
const mongoose= require("mongoose")
const {createToken,verifyToken}= require("./jwt")
const Users = require("./models/jwt")
const app = express()

app.get("/",(req,res) => {
    res.send("Welcome to jwt authentication")
})

const url =('mongodb://ParigiAkhila:parigiakhila2001@ac-sbthcco-shard-00-00.dropbnq.mongodb.net:27017,ac-sbthcco-shard-00-01.dropbnq.mongodb.net:27017,ac-sbthcco-shard-00-02.dropbnq.mongodb.net:27017/?ssl=true&replicaSet=atlas-g86lxn-shard-0&authSource=admin&retryWrites=true&w=majority')
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true})

app.post("/register",async(req,res)=>{
    try{
    const userDeatils = new Users({
        username:req.body.username,
        password:req.body.password,
    })
    const newUser = await userDeatils.save()
    console.log(newUser)
    res.json("User Registered")
    }
    catch(err){
        console.log(err)
        res.status(500).json("There is some error")
    }
})
  
   
app.post("/login",async(req,res) => {
    const user = await Users.findOne({username:req.body.username})
    if(!user) res.status(500).json("User Doesn't Exist")
    else res.status(200).json("You logged in!")
})


app.get("/profile", verifyToken, (req,res) => {
    res.json("profile");
})

app.listen(3000,() =>{
    console.log("Backend server is listing")
})