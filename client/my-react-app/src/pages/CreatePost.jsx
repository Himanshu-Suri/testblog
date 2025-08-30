import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api"; 

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log("Submit clicked!"); 

    try {
      await api.post("/posts", { title, content });
      navigate("/"); []
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Create Post
        </button>
        <button onClick={() => console.log("Button clicked!")}>Test</button>

      </form>
    </div>
  );
}
