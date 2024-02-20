// commentRoutes.js

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/:postId', async (req, res) => {
  try {
    const newComment = await commentController.createComment({ ...req.body, postID: req.params.postId });
    res.json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:postId', async (req, res) => {
  try {
    const comments = await commentController.getCommentsForPost(req.params.postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add routes for get by ID, update, and delete

module.exports = router;
