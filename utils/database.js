import mongoose from "mongoose";
require('dotenv').config({ path: 'ENV_FILENAME' });

let isConnected=false;
export const connectToDB=async ()=>{
    mongoose.set('strictQuery',true)
    if(isConnected){
        console.log('MongoDB is already connected')
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:'share_prompt',
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        isConnected=true;
        console.log('monogdb connected ')
    } catch (error) {
        console.error(error)
    }
}