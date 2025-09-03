import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts"); 
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`); 
      setPosts(posts.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>

      {posts.length === 0 ? (
        <p>No posts found. <button className="text-blue-500" onClick={() => navigate("/create")}>Create one</button></p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="border p-4 mb-2 rounded">
            <h2 className="font-bold">{post.title}</h2>
            <p>{post.content}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => navigate(`/edit/${post.id}`)} 
                className="bg-yellow-400 px-2 py-1 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(post.id)}
                className="bg-red-500 px-2 py-1 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
      <button
                onClick={() => navigate("/create")}
                className="bg-blue-500 px-2 py-1 text-white rounded"
              >
                Create more blogs!!!
              </button>
    </div>
  );
}
