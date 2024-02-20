// postModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
