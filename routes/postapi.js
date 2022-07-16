const express = require('express');
const router = express.Router();

const{ postsCreate, postsFindAll, postsFindOne, postsUpdate, postsDelete } = require ('../controller/post.js')


// Create a new Note
router.post('/post', postsCreate);

// Retrieve all Notes
router.get('/posts', postsFindAll);

// Retrieve a single Note with noteId
router.get('/posts/:postId', postsFindOne);

// Update a Note with noteId
router.put('/notes/:postId', postsUpdate);

// Delete a Note with noteId
router.delete('/notes/:postId', postsDelete);

module.exports = router;