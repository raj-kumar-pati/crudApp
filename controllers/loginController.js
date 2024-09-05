import loginModel from "../models/loginSchema.js";
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
const secretKey = "loginRaj@123";


//login & regitor post rout
const login = async(req,res)=>{
  const {email , password} = req.body;
  try {
    const existingUser = await loginModel.findOne({email : email});
    if(!existingUser){
        return res.render("login" , {"message": "please registor ...."})
    }
    const matchPass = await bcrypt.compare(password ,existingUser.password);
    if(!matchPass){
        return res.render("login", {"message": "enter correct pass..."})
    }
//create token
const token = jwt.sign({email :existingUser.email, id :existingUser._id},secretKey);
//setup cookie
res.cookie("token",token,{
httpOnly: true,
expires: new Date(Date.now()+ 60*1000)
})
res.render("index");
  } catch (error) {
    res.render("login" , {"message": "some error ocured..."})
  }


}



const registor = async(req,res)=>{
    //existing user
    //hashed password
    //user creation
    //token generation

    const {name , sirname , email , password} = req.body;
    try {
        const existingUser = await loginModel.findOne({email : email});
        if(existingUser){
            return res.render("registor" , {"message": "user exists ..."})
        }
        const hashPass = await bcrypt.hash(password , 10);

        const userData = await loginModel.create({
            name : name,
            sirname : sirname,
            email : email,
            password : hashPass
        })
    const token = jwt.sign({email :userData.email, id :userData._id},secretKey);
        //setup cookie
    res.cookie("token",token,{
        httpOnly: true,
        expires: new Date(Date.now()+ 60*1000)
    })
    res.render('fileUpload');

    } catch (error) {
        res.render("registor" , {"message": "some error ocured..."})
    }

}


//login and registor get routs
const loginGet = (req,res)=>{
    res.render("login")
}
const registorGet = (req,res)=>{
    res.render("registor")
}



//check auth
const isAuth = async(req,res,next)=>{
    const token = req.cookies.token;
    if(token){
        const decord = jwt.verify(token,secretKey);
        const decordUser = await loginModel.find({_id : decord.id});
        let name;
       console.log(decordUser.forEach(element => {
         name = element.name;
       }))
   
       req.datafromisAuth = name;
        next();
    }
    else{
        res.render("login" , {"message" : "first login..."});
    }
}

//logout
const logout = (req,res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.render("login",{"message": "first login..."})
    }
    res.cookie("token","iamin",{
        httpOnly: true,
        expires : new Date(Date.now())
    })
    
    res.render("login" ,{"message": "you have logout succefully..."});
}

export {login ,logout, registor ,loginGet ,registorGet ,isAuth};