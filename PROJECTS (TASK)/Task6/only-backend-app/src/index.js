

import dotenv from "dotenv"
import { config } from "dotenv"
import {DB_NAME} from "./constants.js"
import connectDB from "./db/dbConnection.js"
import express from "express"
import { error } from "console"
import {app} from "./app.js"

dotenv.config({
    path: "./env"
})



connectDB().then(() =>{

    app.get('/', (req, res) =>{
        res.send("Database connected")
    })


   

    app.on("Error OCCURED BEFORE LISTENING ON PORT", (error) =>{
        console.log("ERRR: ", error);
        throw error
    })

    app.listen(process.env.PORT || 5000, () =>{
        console.log(`Application is running on http://localhost:${process.env.PORT}`);
    } )
})

.catch((err) =>{
    console.log("Database response Error go to index.js or deeper");
})





