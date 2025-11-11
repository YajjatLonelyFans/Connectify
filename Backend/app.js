const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose") 
const userRoutes = require("./Routes/userRoutes.js")
const postRoutes = require("./Routes/postRoutes.js")
const cors = require("cors")
dotenv.config()



app.use(cors({
  origin: ["https://connectify-frontend-three.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json())

app.use("/api/users" , userRoutes)
app.use("/api/posts" , postRoutes)

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})  
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 3000
app.listen(PORT , ()=>{
    console.log(`Server running on ${PORT}`)
})
