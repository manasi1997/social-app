import express from 'express';
import mongoose from 'mongoose';
import postModel from './models/Post.js';
import commentModel from './models/Comment.js';
import likeModel from './models/Like.js';

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://manasi:Abhi%401997@cluster0.c0lsnhx.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default app;