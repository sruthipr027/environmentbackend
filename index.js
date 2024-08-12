require('dotenv').config()
const express= require('express')
const cors = require('cors')
require('./DB/connection')
const router = require('./Routing/router')
require('./Random/random');
const evServer=express()
evServer.use(cors())
evServer.use(express.json())
evServer.use(router)

const PORT = 4000 || process.env
evServer.listen(PORT, ()=>{
    console.log(`Server Running successfully At Port ${PORT}` );
})

evServer.get('/',(req,res)=>{
    res.send(`Server running`)

})
evServer.post('/',(req,res)=>{
    res.send(`post requested`)

})