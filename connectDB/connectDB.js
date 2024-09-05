import mongoose from "mongoose";
import 'dotenv/config';
const connectDB = async()=>{
   //mongodb://127.0.0.1:27017/crud_node      &appName=Cluster0
   const url = process.env.url;
   const connect = await mongoose.connect(url);
   //const connect = await mongoose.connect('mongodb+srv://Rajkumar:Rajkumar@123@cluster0.ol5tejr.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0');
   if(connect){
    console.log('connection successfull to database...')
   }else{
    console.log("connection failed...")
   }
}


export default connectDB;