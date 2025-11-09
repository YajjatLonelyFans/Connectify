import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Save, Trash2, ArrowLeft } from "lucide-react";
import { ClipLoader } from "react-spinners";

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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <ClipLoader color="#10b981" size={50} />
          <p className="mt-4 text-gray-600 font-medium">Loading post...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pt-24 pb-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <motion.button
            whileHover={{ x: -5 }}
            onClick={() => navigate("/posts")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Posts</span>
          </motion.button>
          
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            Edit Post
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            Make changes to your post
          </motion.p>
        </div>

        {/* Edit Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20"
        >
          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Post Title
              </label>
              <input
                type="text"
                placeholder="Post title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white text-lg font-medium"
                disabled={loading}
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content
              </label>
              <textarea
                placeholder="Write your content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="12"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                disabled={loading}
              />
            </div>

            {/* Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200"
              >
                <span className="font-medium">{message}</span>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUpdate}
                disabled={loading || !title || !content}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <ClipLoader color="#ffffff" size={20} />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Save Changes</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Delete Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-red-50/50 backdrop-blur-lg rounded-2xl p-6 border border-red-100"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Danger Zone</h3>
              <p className="text-sm text-gray-600">
                Once you delete this post, there is no going back. Please be certain.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={18} />
              <span>Delete</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EditPost;