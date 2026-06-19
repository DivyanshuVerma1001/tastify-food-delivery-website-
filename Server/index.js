require("dotenv").config()
const express = require('express')
const authRouter= require('./routes/userAuthRoutes')
const paymentRouter= require('./routes/paymentRoutes')
const DBconnect= require('./database/dbConnection')
const cors= require('cors')
const cookieParser = require("cookie-parser");
const detailRouter = require("./routes/detailRoute")

const app= express();
const allowedOrigins = [
  'http://localhost:5173',
  'https://tastify.divyanshu-verma.tech'
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin || allowedOrigins.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(cookieParser()); 
app.use(express.json())
app.get('/',(req,res)=>{
  res.json({
    status:"backend is alive"
  })
})
app.use('/user',authRouter)
app.use('/payment',paymentRouter)
app.use('/detail',detailRouter)
const port = process.env.PORT||3000
DBconnect()
.then(()=>{
    console.log("Database connected successfully")
    app.listen(port,()=>{
    console.log("listening at port number 3000")
    })
})
.catch((err)=>{
    console.log("error:",err)
})
