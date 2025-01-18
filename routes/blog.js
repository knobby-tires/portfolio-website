// routes/blog.js
const express = require('express');
const router = express.Router();
const blogPosts = require('../data/blogPosts');

router.get('/', (req, res) => {
  res.render('blog/index', { blogPosts });
});

router.get('/:slug', (req, res) => {
  // ... handle individual post routes
});

module.exports = router;