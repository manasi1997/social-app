// likeRoutes.js

const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

router.post('/:postId', async (req, res) => {
  try {
    const newLike = await likeController.createLike({ ...req.body, postID: req.params.postId });
    res.json(newLike);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:postId', async (req, res) => {
  try {
    const likes = await likeController.getLikesForPost(req.params.postId);
    res.json(likes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add routes for get by ID, update, and delete

module.exports = router;
