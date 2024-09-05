import mongoose from "mongoose";
const loginSchema = new mongoose.Schema({
    'name':{
        type:String,
        require:true,
    },
    'sirname':{
        type:String,
        require:true,
    },
    'email':{
        type:String,
        require:true,
    },
    'password':{
        type:String,
        require:true,
    }
});
const loginModel = new mongoose.model('registor', loginSchema);

export default loginModel;