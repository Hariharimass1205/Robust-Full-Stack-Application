import express from "express"
import cors from "cors"
import {connectToMongoDB} from './config/dataBase'
import dotenv from 'dotenv'
import router from "./router/router"

connectToMongoDB()
dotenv.config()
const app = express()
app.use(express.json())

app.use(cors({
    origin: process.env.FRONTEND,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(router)

app.listen(3000,()=>{
    console.log("successfully connected to port 3000")
})