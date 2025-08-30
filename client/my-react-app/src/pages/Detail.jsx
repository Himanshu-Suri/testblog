import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/posts/${id}`, { title, content });
      navigate("/");
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await api.delete(`/posts/${id}`);
      navigate("/");
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Edit / Delete Post</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="flex gap-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-400 text-white px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
