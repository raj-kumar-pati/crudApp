import express from 'express';
const route = express.Router();
import { homeController, createController } from '../controllers/homeController.js';
import { readController } from '../controllers/readController.js';
import { editController , updateController, deleteController} from '../controllers/editController.js';
import { login, logout,registor , loginGet ,registorGet, isAuth } from '../controllers/loginController.js';
import { getUploads, postUploads } from '../controllers/fileupload.js';

//curd 
route.get('/', homeController);
route.post('/', createController);
route.get('/read',isAuth, readController);
route.get('/edit/:id', isAuth,editController);
route.post('/update/:id', isAuth, updateController);
route.get('/delete/:id',isAuth, deleteController);

//login & registor routs
route.get('/login',loginGet);
route.get('/registor',registorGet);
route.get('/logout',logout);

//login & registor post
route.post('/login',login);
route.post('/registor',registor);


//file uplads..
route.get('/uploads',getUploads);
route.post('/upolads',postUploads);


export default route;