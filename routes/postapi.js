const express = require('express');
const router = express.Router();
//Protect the user middleware
const { protect } = require('../middleware/authMiddleware');

const{ postsCreate, postsFindAll, postsFindOne, postsUpdate, postsDelete,postByUser } = require ('../controller/post.js')


// Create a new post
router.post('/posts', postsCreate);

// Retrieve all posts
router.get('/posts', postsFindAll);

// Retrieve a single post with postId
router.get('/posts/:postId', postsFindOne);

// Update a Post with postId
router.put('/posts/:postId', postsUpdate);

// Delete a Post with PostId
router.delete('/posts/:postId/cancel', protect, postsDelete);



// Retrieve a single post with userId
//router.get('/posts/:postId/:userId',  postByUser);

module.exports = router;