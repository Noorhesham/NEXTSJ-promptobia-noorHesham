import mongoose from "mongoose";

let isConnected=false;
export const connectToDB=async ()=>{
    mongoose.set('strictQuery',true)
    if(isConnected){
        console.log('MongoDB is already connected')
        return;
    }
    try {
        await mongoose.connect('mongodb+srv://noorboi:promptnoor55@cluster0.r58tukl.mongodb.net/?retryWrites=true&w=majority',{
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