import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        if(!process.env.MONGODB_URI){
            throw new Error("Mongodb_URI is not defined");
        }
        if(!DB_NAME){
            throw new Error("DB_Name is not defined");
        }

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MONGODB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }catch(error){
        console.log("Mongodb connection error", error);
        process.exit(1);
    }
}

export default connectDB