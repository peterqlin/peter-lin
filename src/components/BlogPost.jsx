import React from "react";
import { useParams, Link } from "react-router-dom";

function BlogPost() {
  const { id } = useParams();

  // This would typically come from an API or database
  // For now, we'll use a sample blog post
  const blogPost = {
    id: 1,
    title: "Getting Started with React Development",
    excerpt:
      "A comprehensive guide to setting up your first React project and understanding the fundamentals of modern web development.",
    content: `
      <p>React has become one of the most popular JavaScript libraries for building user interfaces. Whether you're a seasoned developer or just starting your journey in web development, React offers a powerful and flexible way to create interactive applications.</p>
      
      <h2>Why React?</h2>
      <p>React's popularity stems from several key features:</p>
      <ul>
        <li><strong>Component-Based Architecture:</strong> React allows you to build encapsulated components that manage their own state, then compose them to make complex UIs.</li>
        <li><strong>Virtual DOM:</strong> React's virtual DOM provides a way to efficiently update the browser DOM, resulting in better performance.</li>
        <li><strong>Rich Ecosystem:</strong> With a vast community and extensive library ecosystem, you'll find solutions for almost any problem.</li>
        <li><strong>Cross-Platform:</strong> React can be used to build web, mobile, and desktop applications.</li>
      </ul>

      <h2>Setting Up Your First React Project</h2>
      <p>Getting started with React is easier than ever thanks to tools like Create React App and Vite. Here's how to set up a new project:</p>
      
      <h3>Using Create React App</h3>
      <pre><code>npx create-react-app my-app
cd my-app
npm start</code></pre>

      <h3>Using Vite (Recommended)</h3>
      <pre><code>npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev</code></pre>

      <h2>Understanding React Components</h2>
      <p>Components are the building blocks of React applications. They can be either function components or class components, though function components with hooks are now the preferred approach.</p>

      <h3>Function Component Example</h3>
      <pre><code>function Welcome(props) {
  return &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;
}</code></pre>

      <h2>State Management</h2>
      <p>State is what allows React components to be dynamic and interactive. The useState hook is the most common way to add state to function components:</p>

      <pre><code>import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>

      <h2>Next Steps</h2>
      <p>This is just the beginning of your React journey. As you continue learning, you'll want to explore:</p>
      <ul>
        <li>Props and component communication</li>
        <li>Lifecycle methods and useEffect</li>
        <li>Routing with React Router</li>
        <li>State management with Context API or Redux</li>
        <li>Testing React components</li>
        <li>Performance optimization</li>
      </ul>

      <p>Remember, the best way to learn React is by building projects. Start small and gradually increase the complexity of your applications as you become more comfortable with the concepts.</p>
    `,
    author: "Peter Lin",
    date: "December 15, 2024",
    readTime: "5 min read",
    tags: ["React", "Web Development", "Tutorial"],
    featured: true,
  };

  return (
    <article className="min-h-screen py-20 bg-blue-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back to Blog Link */}
        <Link
          to="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-200"
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

        {/* Article Header */}
        <header className="mb-8">
          {blogPost.featured && (
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
              Featured
            </span>
          )}

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {blogPost.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span>{blogPost.author}</span>
            <span>•</span>
            <span>{blogPost.date}</span>
            <span>•</span>
            <span>{blogPost.readTime}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {blogPost.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                #{tag}
              </span>
            ))}
          </div>
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
