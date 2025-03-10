// src/pages/PostDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchPostDetail();
    // eslint-disable-next-line
  }, [id]);

  const fetchPostDetail = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      if (!response.ok) {
        throw new Error(`Server error! status: ${response.status}`);
      }
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error("Error fetching post detail:", error);
      setErrorMsg("Failed to fetch post details. Please try again later.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {errorMsg && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
          {errorMsg}
        </div>
      )}

      {post && (
        <div>
          <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
          <p className="text-gray-700 mb-6">{post.body}</p>
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
      >
        Back
      </button>
    </div>
  );
};

export default PostDetail;
