import  express from 'express';
import 'dotenv/config';
const app = express();
const port = process.env.port;
import route from './routes/routes.js';
import google from './routes/googleRout.js';

import path from 'path';
import connectDB from './connectDB/connectDB.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// connection for database
connectDB()

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')))

// setup for ejs template file
app.set('view engine', 'ejs')
app.set('views', './views')

// routes
app.use('/', route);
app.use('/',google);



app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
})

