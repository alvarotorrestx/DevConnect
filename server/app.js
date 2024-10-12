const express=require('express')
const cors=require('cors')
const app = express()


app.use(cors(express))
app.use(express.json())



module.exports=app;
