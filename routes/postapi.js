const express = require('express');
const router = express.Router();

const{ postsCreate, postsFindAll, postsFindOne, postsUpdate, postsDelete,getPost } = require ('../controller/post.js')


// Create a new post
router.post('/post', postsCreate);

// Retrieve all posts
router.get('/posts', postsFindAll);

// Retrieve a single post with postId
router.get('/posts/:postId', postsFindOne);

// Update a Post with postId
router.put('/posts/:postId', postsUpdate);

// Delete a Post with PostId
router.delete('/notes/:postId/cancel', postsDelete);

//Protect the user
const { protect } = require('../middleware/authMiddleware');

// Retrieve a single post with userId
router.get('/posts/:postId/:userId', protect, getPost);

module.exports = router;