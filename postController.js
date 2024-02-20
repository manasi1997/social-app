// postController.js

const Post = require('../models/post');

// Create a new post
const createPost = async (postData) => {
  try {
    const newPost = new Post(postData);
    return await newPost.save();
  } catch (error) {
    throw new Error('Error creating a new post');
  }
};

// Get all posts
const getAllPosts = async () => {
  try {
    return await Post.find();
  } catch (error) {
    throw new Error('Error fetching posts');
  }
};

// Get a post by ID
const getPostById = async (postId) => {
  try {
    return await Post.findById(postId);
  } catch (error) {
    throw new Error('Error fetching the post');
  }
};

// Update a post by ID
const updatePost = async (postId, updatedData) => {
  try {
    return await Post.findByIdAndUpdate(postId, updatedData, { new: true });
  } catch (error) {
    throw new Error('Error updating the post');
  }
};

// Delete a post by ID
const deletePost = async (postId) => {
  try {
    return await Post.findByIdAndDelete(postId);
  } catch (error) {
    throw new Error('Error deleting the post');
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
