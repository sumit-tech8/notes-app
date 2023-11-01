import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import newnotesRoute from './routes/newnotesRoute.js'
import cors from 'cors'
import authRoute from './routes/authRoute.js'


//configure env 
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, './client/build')))

//routes
app.use('/api/v1/notes', newnotesRoute);
app.use('/api/v1/auth', authRoute);


//rest api
// app.use('*',function(req,res){
//     res.sendFile(path.join(__dirname,'./client/build/index.html'));
// })
app.get('/',(req,res) => {
    res.send("<h1>Welcome to Notes app <h1/>")
});

//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}` .bgCyan.white);
});