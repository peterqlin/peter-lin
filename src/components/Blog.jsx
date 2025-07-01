import React from "react";
import { Link } from "react-router-dom";

function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React Development",
      excerpt:
        "A comprehensive guide to setting up your first React project and understanding the fundamentals of modern web development.",
      content:
        "This is where the full blog post content will go. You can write about your experiences, tutorials, thoughts, or any other content you'd like to share with your readers.",
      author: "Peter Lin",
      date: "December 15, 2024",
      readTime: "5 min read",
      tags: ["React", "Web Development", "Tutorial"],
      featured: true,
    },
  ];

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
                {post.featured && (
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    Featured
                  </span>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200">
                  {post.title}
                </h3>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

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
