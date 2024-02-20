// postRoutes.js

const express = require('express');
const router = express.Router();
const postController = require('../../controllers/postController');

router.post('/', async (req, res) => {
  try {
    const newPost = await postController.createPost(req.body);
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await postController.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add routes for get by ID, update, and delete

module.exports = router;
