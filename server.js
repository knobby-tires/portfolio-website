// server.js
const express = require('express');
const path = require('path');
const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from public directory
app.use(express.static('public'));

// Sample blog data (later you can move this to a separate data file)
const blogPosts = [
  {
    title: "Getting Started with Modern Web Development",
    slug: "getting-started",
    date: "January 15, 2025",
    excerpt: "An exploration of the latest tools and technologies that are shaping the future of web development...",
    content: "Full blog post content here...",
    image: "/api/placeholder/400/200"
  },
  // Add more posts as needed
];

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    name: 'Jacob Metz',
    blogPosts: blogPosts.slice(0, 3) // Show only latest 3 posts on homepage
  });
});

// Blog routes
app.get('/blog', (req, res) => {
  res.render('blog/index', {
    name: 'Jacob Metz',
    blogPosts
  });
});

app.get('/blog/:slug', (req, res) => {
  const post = blogPosts.find(post => post.slug === req.params.slug);
  if (!post) {
    return res.status(404).render('404');
  }
  res.render('blog/post', {
    name: 'Jacob Metz',
    post
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});