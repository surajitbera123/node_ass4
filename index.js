const express= require("express");
const bodyparse=require("body-parser");
const jwtToken = require("jsonwebtoken");
const app=express();
app.use(bodyparse.json());


app.use('/login',function(req,res){
    const userDetails=req.body;
    if((userDetails.email && userDetails.password)){
        const SECRECT_KEY="SECRET_KEY@123";
        const Token = jwtToken.sign(userDetails,SECRECT_KEY,{expiresIn:60});
        console.log("Token showing in the post and console.log=>",Token);
        res.status(200).send({Token:Token})
    }
    else{
        res.status(400).send({message:"INVALID USER DEATILS"})
    }
   
})


app.get('/userLogin',function(req,res){

    const Token=req.headers["authorization"].split(" ")[1];
    const SECRECT_KEY="SECRET_KEY@123";
    const LoginDetails=jwtToken.verify(Token,SECRECT_KEY);
    console.log(LoginDetails);
    res.status(200).send(LoginDetails);
}).listen(2000);



