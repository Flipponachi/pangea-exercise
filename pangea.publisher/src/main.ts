import mongoose from 'mongoose';
import dotenv from "dotenv";
import {expressApp} from './app';

//load configuration settings
dotenv.config();

const PORT =  process.env.PORT || 9000;
const MONGO_ADDRESS = process.env.MONGO_ADDRESS;

mongoose.connect(MONGO_ADDRESS, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

export const server = expressApp.listen(PORT, () => console.log(`Publisher app listening on ${PORT}`));
