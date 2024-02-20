// commentController.js

const Comment = require('../models/comment');

// Create a new comment
const createComment = async (commentData) => {
  try {
    const newComment = new Comment(commentData);
    return await newComment.save();
  } catch (error) {
    throw new Error('Error creating a new comment');
  }
};

// Get all comments related to a specific post
const getCommentsForPost = async (postId) => {
  try {
    return await Comment.find({ postID: postId }).populate('author');
  } catch (error) {
    throw new Error('Error fetching comments');
  }
};

// Get a single comment by ID
const getCommentById = async (commentId) => {
  try {
    return await Comment.findById(commentId).populate('author');
  } catch (error) {
    throw new Error('Error fetching the comment');
  }
};

// Update a comment by ID
const updateComment = async (commentId, updatedData) => {
  try {
    return await Comment.findByIdAndUpdate(commentId, updatedData, { new: true });
  } catch (error) {
    throw new Error('Error updating the comment');
  }
};

// Delete a comment by ID
const deleteComment = async (commentId) => {
  try {
    return await Comment.findByIdAndDelete(commentId);
  } catch (error) {
    throw new Error('Error deleting the comment');
  }
};

module.exports = {
  createComment,
  getCommentsForPost,
  getCommentById,
  updateComment,
  deleteComment,
};
