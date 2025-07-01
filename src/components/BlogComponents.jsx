import React from "react";
import { Link } from "react-router-dom";

// Reusable component for blog post metadata (author, date, read time)
export const BlogPostMeta = ({ author, date, readTime, className = "" }) => (
  <div className={`flex items-center gap-4 text-sm text-gray-500 ${className}`}>
    <span>{author}</span>
    <span>•</span>
    <span>{date}</span>
    <span>•</span>
    <span>{readTime}</span>
  </div>
);

// Reusable component for blog post tags
export const BlogPostTags = ({ tags, className = "" }) => (
  <div className={`flex flex-wrap gap-2 ${className}`}>
    {tags.map((tag, index) => (
      <span
        key={index}
        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
      >
        #{tag}
      </span>
    ))}
  </div>
);

// Reusable component for featured badge
export const FeaturedBadge = ({ className = "" }) => (
  <span
    className={`inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium ${className}`}
  >
    Featured
  </span>
);

// Reusable component for back to blog link
export const BackToBlogLink = ({ className = "" }) => (
  <Link
    to="/blog"
    className={`inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 ${className}`}
  >
    <svg
      className="w-4 h-4 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
    Back to Blog
  </Link>
);
