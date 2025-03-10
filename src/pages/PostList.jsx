// src/pages/PostList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10; // 10 posts per page

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      const start = currentPage * limit;
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`
      );
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      alert("Failed to fetch posts. Please try again later.");
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    // JSONPlaceholder only has 100 sample posts (IDs 1..100).
    // So if we exceed that, it’ll just return an empty array.
    // But let's do a simple check:
    if (currentPage < 9) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">List of Posts</h2>

        {/* Link to create a new post */}
        <Link
          to="/create"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Create New Post
        </Link>
      </div>

      {/* Posts Listing */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            to={`/posts/${post.id}`}
            key={post.id}
            className="block bg-white p-4 rounded shadow hover:shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {post.title}
            </h3>
            <p className="text-gray-600">
              {post.body.length > 60
                ? `${post.body.substring(0, 60)}...`
                : post.body}
            </p>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === 9} 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;
