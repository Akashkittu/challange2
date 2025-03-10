
import React from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
function App() {

  return (
    <Router>
    {/* Simple nav at the top, optional */}
    <div className="bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">My Post App</h1>
    </div>

    {/* Main Content */}
    <Routes>
      {/* Page 1: List */}
      <Route path="/" element={<PostList />} />

      {/* Page 3: Detail View */}
      <Route path="/posts/:id" element={<PostDetail />} />

      {/* Page 2: Create New Post */}
      <Route path="/create" element={<CreatePost />} />
    </Routes>
  </Router>

  )
}

export default App
