const express = require('express');
const app = express();


const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv').config();

const appControl = require('../controllers/app');



const port = process.env.PORT || 3000;


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.listen(port,()=>{
    console.log(`hello I'm listening on port ${port}`);
})

const io = require('socket.io')(3000,{
    cors: {
        origin : "*"
    }
});

io.on('connection', function(socket){
    console.log("connected");
 socket.emit("message","send message");
});


app.use('/', appControl);







