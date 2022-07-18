const Post = require('../models/postModel');
const asyncHandler = require('express-async-handler')

//Create post
module.exports.postsCreate = (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: 'Post content can not be empty',
        });
    }

    // Create a Post
    const note = new Post({
        title: req.body.title || 'Untitled Post',
        content: req.body.content,
    });

    // Save Post in the database
    note.save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Post.',
            });
        });
}


//Get all the post
module.exports.postsFindAll = (req, res) => {
    Note.find()
        .then((post) => {
            res.send(post);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving notes.',
            });
        });
};


//Get post by a apecfic user (ID)
 module.exports.getPost= asyncHandler(async (req, res) => {
    const posts = await Post.find({ user: req.user.id })
    res.status(200).json(posts)
  })


module.exports.postsFindOne = (req, res) => {
    //Retriving a single Post by Id
    Note.findById(req.params.postId)
        .then((post) => {
            if (!post) {
                return res.status(404).send({
                    message: 'Note not found with id ' + req.params.postId,
                });
            }
            res.send(post);
        })
        .catch((err) => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Post not found with id ' + req.params.postId,
                });
            }
            return res.status(500).send({
                message: 'Error retrieving post with id ' + req.params.postId,
            });
        });
};

//Update the posts
// Update a post identified by the postId in the request
module.exports.postsUpdate = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Post content can not be empty"
        });
    };

    // Find post and update it with the request body
    Note.findByIdAndUpdate(req.params.postId, {
            title: req.body.title || "Untitled Post",
            content: req.body.content
        }, { new: true }) //The {new: true} option in the findByIdAndUpdate() method is used to return 
        //the modified document to the then() function instead of the original.
        .then(post => {
            if (!post) {
                return res.status(404).send({
                    message: "Post not found with id " + req.params.postId
                });
            }
            res.send(post);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Post not found with id " + req.params.postId
                });
            }
            return res.status(500).send({
                message: "Error updating post with id " + req.params.postId
            });
        });
};


//Delete posts by ID
module.exports.postsDelete = (req, res) => {
    Post.findByIdAndRemove(req.params.postId)
        .then((post) => {
            if (!post) {
                return res.status(404).send({
                    message: 'Post not found with id ' + req.params.postId,
                });
            }
            res.send({ message: 'Post deleted successfully!' });
        })
        .catch((err) => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'Postnot found with id ' + req.params.postId,
                });
            }
            return res.status(500).send({
                message: 'Could not delete Post with id ' + req.params.postId,
            });
        });
}