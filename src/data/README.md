# Blog Data Structure

This directory contains the shared data and utilities for the blog functionality.

## Files

- `blogPosts.js` - Contains all blog post data and helper functions
- `README.md` - This documentation file

## Blog Post Structure

Each blog post object should have the following properties:

```javascript
{
  id: 1,                    // Unique identifier (number)
  title: "Post Title",      // Post title (string)
  excerpt: "Brief description...", // Short description for blog list (string)
  content: "<p>Full HTML content...</p>", // Full post content with HTML (string)
  author: "Author Name",    // Author name (string)
  date: "December 15, 2024", // Publication date (string)
  readTime: "5 min read",   // Estimated reading time (string)
  tags: ["Tag1", "Tag2"],   // Array of tags (string[])
  featured: true,           // Whether post is featured (boolean)
}
```

## Helper Functions

- `getAllBlogPosts()` - Returns all blog posts
- `getBlogPostById(id)` - Returns a specific blog post by ID
- `getFeaturedBlogPosts()` - Returns only featured blog posts

## Adding New Blog Posts

1. Open `blogPosts.js`
2. Add a new blog post object to the `blogPosts` array
3. Ensure the `id` is unique and sequential
4. The post will automatically appear in both the blog list and individual post pages

## Components

The blog functionality uses these reusable components from `../components/BlogComponents.jsx`:

- `BlogPostMeta` - Displays author, date, and read time
- `BlogPostTags` - Displays post tags
- `FeaturedBadge` - Displays featured badge
- `BackToBlogLink` - Back to blog navigation link
