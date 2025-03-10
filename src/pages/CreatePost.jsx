// src/pages/CreatePost.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title.trim()) {
      setErrorMsg("Title is required.");
      return;
    }

    if (description.trim().length > 1000) {
      setErrorMsg("Description must be 1000 characters or less.");
      return;
    }

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          body: description,
          userId: 1, // some user ID
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error(`Server error! status: ${response.status}`);
      }

      // For JSONPlaceholder, the response returns the newly created post,
      // but it won't be actually added to a DB.
      // In a real app, you'd handle the JSON response accordingly.
      await response.json();

      // Success: redirect back to post list
      alert("Post created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      setErrorMsg("Failed to create a new post. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Create a New Post</h2>

      {errorMsg && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your post title"
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description (max 1000 characters)
          </label>
          <textarea
            id="description"
            rows="6"
            maxLength={1000}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your post description..."
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
