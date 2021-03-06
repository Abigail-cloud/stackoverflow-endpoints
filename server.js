const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path');

//USE
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static("public"))

//The main Page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
    //__dirname : Will resolve to your project folder.
});

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

// Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

//Import the routes
const user = require('./routes/userapi');
const post = require('./routes/postapi')

//Basepath
app.get('/', (req, res)=>{
    res.json('Message Recieved!')
});

//The routes
app.use('/', post);
app.use('/auth', user);
app.use(cors());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server listening on port  ${port}`);
})
