import { MONGODB_URI } from "../util/secrets";
import bluebird from "bluebird";
import mongoose from "mongoose";

// Connect to MongoDB
export const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

export const connectHostel = async (): Promise<void> => {
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
        () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
            console.log("MongoDB connected: Hostel collection connected!");
    },
    ).catch(err => {
        console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
        // process.exit();
    });
};

