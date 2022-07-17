const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
const mongoose = require('mongoose');


//Configured database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.CONNECTURL,{
    useNewUrlParser: true,
}).then(()=>{
    console.log('Database connected successfully!');
}).catch(error => {
    console.log('Error! Database not connected', error);
    process.exit();
});

//Export the routes
const user = require('./routes/userapi');
const post = require('./routes/postapi')

//Basepath
app.get('/', (req, res)=>{
    res.json('Message Recieved!')
});

//The routes
app.use('/', post);
app.use('/auth', user);

app.listen(port, () => {
    console.log(`Server listening on port  ${port}`);
})
