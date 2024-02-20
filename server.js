// server.js

import express from 'express';
import mongoose from 'mongoose';
import next from 'next';
import { createServer } from 'http';
import { parse } from 'url';
import nextI18NextMiddleware from 'next-i18next/middleware';
import nextI18next from './i18n';
import postRoutes from './api/posts';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

nextApp.prepare().then(() => {
  const app = express();

  // Serve static files from the uploads folder
  app.use('/uploads', express.static('uploads'));

  // Use JSON middleware
  app.use(express.json());

  // Use API routes
  app.use('/api/posts', postRoutes);

  // Use Next.js i18n middleware
  app.use(nextI18NextMiddleware(nextI18next));

  app.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const httpServer = createServer(app);

  httpServer.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server ready on http://localhost:${PORT}`);
  });
});

// Import the Post and Comment models
import Post from './models/post';
import Comment from './models/comment';

// Define the comments routes
app.route('/api/posts/:pid/comments').all((req, res, next) => {
  const postId = req.params.pid;
  next();
}, async (req, res) => {
  switch (req.method) {
    case 'POST':
      try {
        const newComment = new Comment({ content: req.body.content });
        const post = await Post.findById(postId);
        if (!post) return res.status(404).send("Post not found");
        newComment.post = post._id;
        const result = await newComment.save();
        res.send(result);
      } catch (ex) {
        res.status(500).send(ex);
      }
      break;
    case 'GET':
      try {
        const comments = await Comment.find({ post: postId }).populate('post');
        res.send(comments);
      } catch (ex) {
        res.status(500).send(ex);
      }
      break;
    default:
      res.sendStatus(405);
      break;
  }
});

app.route('/api/posts/:pid/comments/:cid').all((req, res, next) => {
  const postId = req.params.pid;
  const commentId = req.params.cid;
  next();
}, async (req, res) => {
  switch (req.method) {
    case 'PUT':
      try {
        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).send("Comment not found");
        comment.set(req.body);
        await comment.save();
        res.send(comment);
      } catch (ex) {
        res.status(500).send(ex);
      }
      break;
    case 'DELETE':
      try {
        const comment = await Comment.findByIdAndDelete(commentId);
        if (!comment) return res.status(404).send("Comment not found");
        res.send(comment);
      } catch (ex) {
        res.status(500).send(ex);
      }
      break;
    default:
      res.sendStatus(405);
      break;
  }
});
