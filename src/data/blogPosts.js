export const blogPosts = [
  {
    id: 1,
    title: "The origin story of my homepage animation",
    excerpt: "Where did these splitting squares come from?",
    content: `<p>Well, originally, they were circles. It must have been around 4th or 5th grade when I first discovered The Useless Web. It's a portal to myriad random, quirky, gimmicky sites. One of those sites is koalastothemax.com, and for some reason that one stuck with me. It was probably the smoothness of the animations and the satisfaction one felt by melting larger circles into smaller circles to ultimately reveal a hidden image.</p>
        <p>So at the beginning of this summer, when I decided to try out Paper.js, I felt it fitting to try and recreate that one website I had seen all those years ago. And with the power of Cursor, I was able to easily port the recreation I had made into a neat little homepage animation. So there you go, and please do check out <a href="https://koalastothemax.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">koalastothemax.com</a> (and complete the image).</p>`,
    author: "Peter Lin",
    date: "July 1, 2025",
    readTime: "<1 min read",
    tags: ["Storytime"],
    featured: true,
  },
];

// Helper function to get a specific blog post by ID
export const getBlogPostById = (id) => {
  return blogPosts.find((post) => post.id === parseInt(id));
};

// Helper function to get all blog posts
export const getAllBlogPosts = () => {
  return blogPosts;
};

// Helper function to get featured blog posts
export const getFeaturedBlogPosts = () => {
  return blogPosts.filter((post) => post.featured);
};
