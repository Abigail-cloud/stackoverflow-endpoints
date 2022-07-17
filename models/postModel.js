const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            reuired: true,
            ref:'User'
    }, 
    title: String,
    content: String
}, {
    timestamps: true
});

const Post =mongoose.model('Post', PostSchema);
module.exports = Post;