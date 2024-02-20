// commentModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
