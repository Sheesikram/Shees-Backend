//require('dotenv').config({path:'./env'});
import dotenv from "dotenv";
import mongoose from "mongoose";    
import express from "express";
import {DB_NAME} from "./constants.js"
import connectDB from "./db/index.js";

dotenv.config(
    {path:'./env'}
);
connectDB()
.then(()=>{
    app.listen((process.env.PORT||8000),()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })

})
.catch((err)=>{
    console.log("Error connecting to DB",err);
    throw err;
})

//Approach 2 for db connection is in db folder index.js
//Aproach 1 for db connection
// const app = express();

// (async () => {  //async function used for db on other continent :)
//   try {
//    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//    app.on("error",(error)=>{
//     console.log("Error connecting to DB",error);
//     throw error;
// });
//     app.listen(process.env.PORT, () => {
//       console.log( `Server is running on port ${process.env.PORT}`);
//     });

//   } catch (error) {
//     console.log("Error connecting to DB", error);
//     throw error;
//   }
// })(); 