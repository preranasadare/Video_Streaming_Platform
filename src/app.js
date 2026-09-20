import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app=express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))  //To allow json data to be sent in the request body and also to limit the size of the json data to 16kb
app.use(express.urlencoded({extended:true,limit:"16kb"})) //To allow urlencoded data to be sent in the request body and also to limit the size of the urlencoded data to 16kb
app.use(express.static("public")) //To allow static files to be served from the public folder
app.use(cookieParser()) //To allow cookies to be sent in the request headers and also to parse the cookies in the request headers
export {app}