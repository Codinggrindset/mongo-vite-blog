import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';


const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single post by slug
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: req.params.slug }
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Create a post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, slug, content, excerpt, date } = req.body;
    if (!title || !slug || !content || !excerpt || !date) {
      return res.status(400).json({ error: 'title, slug, content, excerpt, and date are required' });
    }
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        date: new Date(date),
      }
    });
    res.status(201).json(post);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'A post with that slug already exists' });
    }
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Delete a post by slug
app.delete('/api/posts/:slug', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: req.params.slug }
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    await prisma.post.delete({
      where: { slug: req.params.slug }
    });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});