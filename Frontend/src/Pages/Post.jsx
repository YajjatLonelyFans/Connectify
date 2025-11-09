import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/NavBar.jsx";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, MoreVertical } from "lucide-react";
import { ClipLoader } from "react-spinners";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <ClipLoader color="#10b981" size={50} />
          <p className="mt-4 text-gray-600 font-medium">Loading posts...</p>
        </div>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">All Posts</h1>
              <p className="text-gray-600">Discover amazing content from the community</p>
            </div>
            
            <Link
              to="/create"
              className="hidden sm:flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              + Create Post
            </Link>
          </motion.div>

          {/* Posts Grid */}
          <AnimatePresence>
            {posts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-gray-600 text-lg">No posts found.</p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20"
                  >
                    {/* Post Header */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {post.user?.name?.[0] || "U"}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{post.user?.name || "Unknown"}</h3>
                            <p className="text-sm text-gray-500">Posted recently</p>
                          </div>
                        </div>

                        {user && post.user && user._id === post.user._id && (
                          <div className="relative">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setActiveMenu(activeMenu === post._id ? null : post._id)}
                              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                              <MoreVertical size={20} className="text-gray-600" />
                            </motion.button>

                            <AnimatePresence>
                              {activeMenu === post._id && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-10"
                                >
                                  <button
                                    onClick={() => {
                                      navigate(`/edit/${post._id}`);
                                      setActiveMenu(null);
                                    }}
                                    className="w-full flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-emerald-50 transition-colors"
                                  >
                                    <Edit2 size={16} />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleDelete(post._id);
                                      setActiveMenu(null);
                                    }}
                                    className="w-full flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <Trash2 size={16} />
                                    <span>Delete</span>
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>
                      <p className="text-gray-700 leading-relaxed">{post.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Posts;