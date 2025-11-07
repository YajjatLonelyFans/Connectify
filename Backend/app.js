const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose") 
dotenv.config()

PORT = process.env.PORT || 3000
app.listen(PORT , ()=>{
    console.log(`Server running on ${PORT}`)
})

app.get("/" , (req,res)=>{
    res.send("Welcome to Connectify")
})

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})  
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));