///index.js
import express from 'express';
import Router from './routes/users.js'
import morgan from 'morgan'
import mysql from 'mysql2/promise'

const app = express();

process.loadEnvFile();

////

const PORT = process.env.PORT ?? 3000
/*
const dateMid = (req, res, next)=>{
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}
*/


app.use(express.static('public'))
app.use(express.json())
app.use(morgan('dev'))
//app.use(dateMid)
app.use("/api/users", Router)

/////index.js
const errorHandler = (error, req, res, next)=>{
    const status = error.status ?? 500
    
    res.status(status).json( { message: error.message } )
}
app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log(`server is listening in port ${PORT}`)
})