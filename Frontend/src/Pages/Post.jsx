import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/NavBar.jsx";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <p className="text-gray-500 text-lg">Loading posts...</p>
      </div>
    );

  return (
    <>
    <Navbar />
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Posts</h1>
        <Link
          to="/create"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-600 text-center">No posts found.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-md rounded-lg p-5 mb-5 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-700 mb-3">{post.content}</p>

            <div className="text-sm text-gray-500 mb-3">
              Posted by: <span className="font-medium">{post.user?.name || "Unknown"}</span>
            </div>

            {user && post.user && user._id === post.user._id && (
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/edit/${post._id}`)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
    </>
  );
};

export default Posts;
