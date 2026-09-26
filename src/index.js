//require('dotenv').config({path:'./env'})       Good to include the dotenv in the stating so that it allows to access all the variables and also its not a good approach no doubt there will be no error but writing this in the starting is not a proper syntax
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from "./app.js"
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO DB connection failed !!!",err);
})













/*
This is first approach


import express from "express"
const app=express()
//IIFE (function)() but better practice is to write a ;(semicollan) to avoid errors
(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
        app.on("error",(error)=>{
            console.log("ERR:",error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on post ${process.env.PORT}`);
        })

    }catch(error){
        console.error("ERROR:",error)
        throw err
    }
})()

*/