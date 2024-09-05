import StudentModel from "../models/studentSchema.js";

const readController = async(req,res)=>{
    try {
      //req.datafromisAuth = "hello";
      //console.log(req.datafromisAuth);
      const user = req.datafromisAuth;
     const  records =  await StudentModel.find({})
       if(records){
        res.render('read',{'records':records ,'user':user});
        console.log('data readed...');
       }else{
        res.render('read')
       } 
    } catch (error) {
       console.log(error.message) 
    }
}



export {readController}