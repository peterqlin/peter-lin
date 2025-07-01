import React from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogPostById } from "../data/blogPosts";
import {
  BlogPostMeta,
  BlogPostTags,
  FeaturedBadge,
  BackToBlogLink,
} from "./BlogComponents";

function BlogPost() {
  const { id } = useParams();
  const blogPost = getBlogPostById(id);

  // Handle case when blog post is not found
  if (!blogPost) {
    return (
      <article className="min-h-screen py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-6">
          <BackToBlogLink className="mb-8" />

          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog Post Not Found
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              Return to Blog
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="min-h-screen py-20 bg-blue-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back to Blog Link */}
        <BackToBlogLink className="mb-8" />

        {/* Article Header */}
        <header className="mb-8">
          {blogPost.featured && <FeaturedBadge className="mb-4" />}

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {blogPost.title}
          </h1>

          <BlogPostMeta
            author={blogPost.author}
            date={blogPost.date}
            readTime={blogPost.readTime}
            className="mb-6"
          />

          <BlogPostTags tags={blogPost.tags} />
        </header>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
