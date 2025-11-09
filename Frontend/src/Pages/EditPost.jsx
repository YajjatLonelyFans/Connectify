import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fetched, setFetched] = useState(false);

 
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        console.log("Fetched post data:", res.data);
        setTitle(res.data.title || "");
        setContent(res.data.content || "");
        setFetched(true);
      } catch (err) {
        console.error("Error fetching post:", err);
        setMessage("❌ Could not load post");
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`/api/posts/${id}`, { title, content });
      setMessage("✅ Post updated successfully!");
      setTimeout(() => navigate("/posts"), 1000);
    } catch (err) {
      console.error("Error updating post:", err);
      setMessage("❌ Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      setLoading(true);
      await axios.delete(`/api/posts/${id}`);
      navigate("/posts");
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  if (!fetched)
    return (
      <div className="h-screen flex justify-center items-center text-gray-600">
        Loading post...
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Post</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <textarea
            placeholder="Write your content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            className="w-full p-2 border rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
        </form>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
        >
          Delete Post
        </button>

        {message && (
          <p className="mt-3 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default EditPost;
