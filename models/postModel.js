const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
    title: String,
    content: String
}, {
    timestamps: true
});

const Post =mongoose.model('Post', PostSchema);
module.exports = Post;