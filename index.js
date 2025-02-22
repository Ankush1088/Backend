 import express from "express";
import cors from "cors";  
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./Utils/db.js "
import userRoute from "./Router/router.user.js";
import companyRouter from './Router/Company.route.js';
import jobRouter from './Router/job.router.js';
import applicationRoute from "./Router/applications.router.js";
dotenv.config({});
const app = express();

 

//middle ware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const corsOption = {
  origin: ["http://localhost:5000"],
  credentials: true,
};

// Use routes (if necessary) 
app.use(cors(corsOption));

const PORT =  5000;
;
app.use('/api/user', userRoute);
app.use('/api/company', companyRouter);
app.use('/api/job', jobRouter);
app.use('./api/application', applicationRoute);
app.listen(PORT, () => {
  connectDB();
  console.log(`server is start on port number ${PORT}`);
});
