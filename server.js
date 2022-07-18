const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
const mongoose = require('mongoose');


app.use(express.static("public"))
const path = require('path');
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

//Swagger documentation
//Swagger Document
const swaggerJsDoc = require('swagger-jsdoc');


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "On Time Delivery_Restful API",
            description: "User Parcel API Information",
            contact: {
                name: "Abigail Developer"
            },
            servers: ["http://localhost:8001"],
        }
    },
    // ['.routes/*.js']
    apis: ["server.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const swaggerUi = require('swagger-ui-express');


//Get all users post
/**
 * @swagger
 * /post:
 *  get:
 *    description: Use to request all users post
 *    responses:
 *      '200':
 *        description: A successful response
 */


//Get all users post by postId
/**
 * @swagger
 * /posts/:postId:
 *  get:
 *    description: Use to request all users post
 *    responses:
 *      '200':
 *        description: A successful response
 */

/**
 * @swagger
 * definitions:
 *   Signup:
 *     required:
 *       - name
 *       - email
 *       - password
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       path:
 *         type: string
 */


//User Signup
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and login
 */

/**
 * @swagger
 * tags:
 *   - name: Signup
 *     description: Signup
 *   - name: Accounts
 *     description: Accounts
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     description: Signup to the application
 *     tags: [Users, Signup]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters'
 *       - name: email
 *         description: User's email.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: signup
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Signup'
 */


/**
 * @swagger
 * definitions:
 *   Login:
 *     required:
 *       - name
 *       - email
 *       - password
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       path:
 *         type: string
 */


//User Login
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User login
 */

/**
 * @swagger
 * tags:
 *   - name: Login
 *     description: Login
 *   - name: Account login
 *     description: Accounts logged
 */

/**
 * @swagger
 * /login:
 *   post:
 *     description: Login to the application
 *     tags: [Users, Login]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/email'
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Login'
 */




//Get post by user id
/**
 * @swagger
 * /posts/:postId/:userId:
 *  get:
 *    description: Get all the parcel-ids in each user parcels
 *    responses:
 *      '200':
 *        description: A successful response
 */



/**
 * @swagger
 * definitions:
 *   Post:
 *     required:
 *       - title
 *       - content
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       path:
 *         type: string
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User post creation
 */

/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Post Creation
 *   - name: Posts
 *     description: Posts
 */

/**
 * @swagger
 * /post:
 *   post:
 *     description: Post created with title
 *     tags: [Users, Post]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/title/content'
 *       - name: post
 *         description: Post created.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Parcels
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Parcel'
 */

/**
 * @swagger
 * /parcels/parcelId/edit:
 *    put:
 *      description: Use to update parcel
 *    parameters:
 *      - name: parcelId
 *        in: query
 *        description: Edit the parcel with their Ids
 *        required: false
 *        schema:
 *          type: integer
 *          format: integer
 *    responses:
 *      '201':
 *        description: Successfully created user
 */

//Delete parcels by parcelId
/**
 * @swagger
 * /parcels/parcelId/cancel:
 *    delete:
 *      description: Delete parcel
 *    parameters:
 *      - name: parcelId
 *        in: query
 *        description: Delete the parcel with their Ids
 *        required: false
 *        schema:
 *          type: integer
 *          format: integer
 *    responses:
 *      '201':
 *        description: Deleted successfully 
 */

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(port, () => {
    console.log(`Server listening on port  ${port}`);
})
