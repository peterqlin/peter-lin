import React from "react";
import { Link } from "react-router-dom";
import { getAllBlogPosts } from "../data/blogPosts";
import { BlogPostMeta, BlogPostTags, FeaturedBadge } from "./BlogComponents";

function Blog() {
  const blogPosts = getAllBlogPosts();

  return (
    <section id="blog" className="min-h-screen py-20 bg-blue-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="section-title text-center">Blog</h2>
        <p className="text-lg text-gray-700 text-center mb-12 leading-relaxed">
          Just, like, stuff I feel like writing about.
        </p>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="block">
              <article className="card hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                {post.featured && <FeaturedBadge className="mb-4" />}

                <BlogPostMeta
                  author={post.author}
                  date={post.date}
                  readTime={post.readTime}
                  className="mb-4"
                />

                <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200">
                  {post.title}
                </h3>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <BlogPostTags tags={post.tags} className="mb-4" />

                <div className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200">
                  Read more →
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
