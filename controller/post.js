const Post = require('../models/postModel');
//const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

//Create post
module.exports.postsCreate = async(req, res) => {
    // Validate request
    try {
        if (!req.body.content) {
            return res.status(400).send({
                message: 'Post content can not be empty',
            });
        }

        // Create a Post
        const post = new Post({
            title: req.body.title || 'Untitled Post',
            content: req.body.content,
        });

        // Save Post in the database
        await post.save()
            .then((data) => {
                res.send(data);
            })
    }
    catch(err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Post.',
            });
        };
}


//Get all the post
module.exports.postsFindAll =  async (req, res) => {
    try { const post = await Post.find()
         res.send(post);
       }
        catch (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving notes.',
            });
        };
};


module.exports.postsFindOne = asyncHandler (async(req, res) => {
    //Retriving a single Post by Id
    try {
        const post = await Post.findById(req.params.postId)
        if (!post) {
            return res.status(404).send({
                message: 'Post not found with id ' + req.params.postId,
            });
        }
        res.send(post);
    }
    catch(err){
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Post not found with id ' + req.params.postId,
                });
            }
            return res.status(500).send({
                message: 'Error retrieving post with id ' + req.params.postId,
            });
        };
});

//Update the posts
// Update a post identified by the postId in the request
module.exports.postsUpdate = asyncHandler(async(req, res) => {
       // Validate Request
    try {
        if (!req.body.content) {
            return res.status(400).send({
                message: "Post content can not be empty"
            });
        }

        // Find note and update it with the request body
       const post=  await Post.findByIdAndUpdate(req.params.postId, {
            title: req.body.title || "Untitled Note",
            content: req.body.content
        }, { new: true })
    
        if (!post) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.postId
            });
        }
        res.send(post);
    } catch(err){
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });                
        }
        return res.status(500).send({
            message: "Error updating post with id " + req.params.postId
        });
    };
});


//Delete posts by ID
module.exports.postsDelete =asyncHandler (async (req, res) => {
 try{const post =  await Post.findByIdAndRemove(req.params.postId)
        
            if (!post) {
                return res.status(404).send({
                    message: 'Post not found with id ' + req.params.postId,
                });
            }
            res.send({ message: 'Post deleted successfully!' });
        }
        catch(err) {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'Postnot found with id ' + req.params.postId,
                });
            }
            return res.status(500).send({
                message: 'Could not delete Post with id ' + req.params.postId,
            });
        };
})


//retrieve post by user Id
// module.exports.postByUser = asyncHandler(async (req, res) => {
//     const post = await Post.find({ User: req.user.id })
  
//     res.status(200).json(post)
//   })