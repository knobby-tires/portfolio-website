// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');
const marked = require('marked');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Serve static files from public directory
app.use(express.static('public'));

// Blog post loading function
function getBlogPosts() {
    const postsDirectory = path.join(__dirname, 'blog');
    try {
        const filenames = fs.readdirSync(postsDirectory);
        
        const posts = filenames.map(filename => {
            const filePath = path.join(postsDirectory, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const { data, content } = matter(fileContents);
            
            return {
                ...data,
                slug: filename.replace('.md', ''),
                content: marked.parse(content)
            };
        });

        return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
        console.error('Error loading blog posts:', error);
        return [];
    }
}

const blogPosts = getBlogPosts();

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log(blogPosts);
