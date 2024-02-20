// likeController.js

const Like = require('../models/like');

// Create a new like
const createLike = async (likeData) => {
  try {
    const newLike = new Like(likeData);
    return await newLike.save();
  } catch (error) {
    throw new Error('Error creating a new like');
  }
};

// Get all likes related to a specific post
const getLikesForPost = async (postId) => {
  try {
    return await Like.find({ postID: postId }).populate('userID');
  } catch (error) {
    throw new Error('Error fetching likes');
  }
};

// Get a single like by ID
const getLikeById = async (likeId) => {
  try {
    return await Like.findById(likeId).populate('userID');
  } catch (error) {
    throw new Error('Error fetching the like');
  }
};

// Update a like by ID
const updateLike = async (likeId, updatedData) => {
  try {
    return await Like.findByIdAndUpdate(likeId, updatedData, { new: true });
  } catch (error) {
    throw new Error('Error updating the like');
  }
};

// Delete a like by ID
const deleteLike = async (likeId) => {
  try {
    return await Like.findByIdAndDelete(likeId);
  } catch (error) {
    throw new Error('Error deleting the like');
  }
};

module.exports = {
  createLike,
  getLikesForPost,
  getLikeById,
  updateLike,
  deleteLike,
};
