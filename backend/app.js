import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AvatarRouter from './routes/avatarRoute.js';
import router from './routes/userRoute.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// app.use(express.json({ limit: "16kb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(cookieParser());



// router declaration
app.use("/api/v1/users", router);
app.use("/api/v1/avatar",AvatarRouter);

export { app };