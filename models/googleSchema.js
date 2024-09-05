import mongoose from "mongoose";
const googleSchema = new mongoose.Schema({
    'name':{
        type:String,
        require:true,
    },
    'photos':{
        type:String,
        require:true,
    },
    'email':{
        type:String,
        require:true,
    },
    
});
const googleModel = new mongoose.model('google', googleSchema);

export default googleModel;