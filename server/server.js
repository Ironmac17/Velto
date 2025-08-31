require("dotenv").config();
const express = require("express");
const cors=require("cors");
const path=require("path");
const app=express();
const connectDB=require("./config/db");

app.use(
    cors({
        origin: process.env.CLIENT.URL||"*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"]
    })
);

app.use(express.json());
connectDB();

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>
    console.log(`Server is running on port ${PORT}`)
);
