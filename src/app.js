import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';



const app = express();
//configs
app.use(cors({
origin: process.env.CORS_ORIGIN,
    credentials: true
}));
//use for json fetching
app.use(express.json({limit: '16kb'}));
//url encoder
app.use(express.urlencoded({extended: true}));
//storefiles
app.use(express.static('public'));
//cookie parser
app.use(cookieParser());





export {app};