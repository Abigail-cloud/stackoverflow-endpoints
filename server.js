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
const connectDB = async () => {
    await mongoose.connect(process.env.CONNECTURL)
}
connectDB();

// Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

//Import the routes
const user = require('./routes/userapi.js');
const post = require('./routes/postapi')


//The routes
app.use('/', post);
app.use('/auth', user);
app.use(cors());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {
        console.log(`Server listening on port  ${port}`);
    })
