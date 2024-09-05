//import loginModel from "../models/loginSchema.js";
import googleModel from "../models/googleSchema.js";
const googleSuccess = async(req,res)=>{
    
        if(!req.user){
            res.redirect('/auth/callback/failure')
        }
            
       // res.send( req.user.photos[0].value);
       // const {name , sirname , email , password} = req.body;
        const name = req.user.displayName;
        const email = req.user.email;
        const photos =req.user.photos[0].value;//sirname = photo 
        console.log([name,email,photos]);



        try {
            const existingUser = await googleModel.findOne({email : email});
            if(existingUser){
                return res.render("registor" , {"message": "user exists ..."})
            }
            
    
            const userData = await googleModel.create({
                name : name,
                photos: photos,
                email : email,
               
            })
            console.log(userData);
        
       // res.render('fileUpload');
       res.send("successful...google.")
    
        } 
        catch (error) {
            res.render("registor" , {"message": "some error ocured..."})
        }
    
    }
    

const googleFailur = (req,res)=>{
    res.send("Error");
}
export {googleSuccess,googleFailur};