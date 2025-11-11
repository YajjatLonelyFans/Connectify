import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/NavBar"; 
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { ClipLoader } from "react-spinners";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/posts", { title, content });
      toast.success("Post created successfully!");
      navigate("/posts");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(error.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pt-24 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          
          <div className="mb-8">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              Create New Post
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600"
            >
              Share your thoughts with the community
            </motion.p>
          </div>

          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20"
          >
            <div className="space-y-6">
             
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Post Title
                </label>
                <input
                  type="text"
                  placeholder="Give your post an engaging title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white text-lg font-medium"
                  disabled={loading}
                />
              </div>

            
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  placeholder="Share your story, insights, or ideas..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="10"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                  disabled={loading}
                />
              </div>

             
              <div className="flex items-center space-x-4 pt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={loading || !title || !content}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <ClipLoader color="#ffffff" size={20} />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Publish Post</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default CreatePost;