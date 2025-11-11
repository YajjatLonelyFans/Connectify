import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Save, X, LogOut, Home, Mail, Lock, User, Camera } from "lucide-react";
import { ClipLoader } from "react-spinners";

const Profile = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) setFormData({ name: user.name, email: user.email, password: "" });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put("/users/edit", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage("❌ Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pt-24 pb-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20"
        >
          
          <div className="relative h-32 bg-gradient-to-r from-emerald-500 to-teal-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white text-4xl font-bold">
                  {formData.name[0] || "U"}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  <Camera size={18} />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
          
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="px-4 py-3 rounded-xl mb-6 bg-emerald-50 text-emerald-700 border border-emerald-200"
                >
                  <span className="font-medium">{message}</span>
                </motion.div>
              )}
            </AnimatePresence>

          
            {!isEditing ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">{formData.name}</h1>
                  <p className="text-gray-600">{formData.email}</p>
                </div>

                <div className="flex flex-col space-y-3 pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(true)}
                    className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Edit2 size={20} />
                    <span>Edit Profile</span>
                  </motion.button>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate("/posts")}
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                    >
                      <Home size={18} />
                      <span>Go Home</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={logout}
                      className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-all"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
            
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsEditing(false)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                <div className="space-y-4">
                
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                        disabled={loading}
                      />
                    </div>
                  </div>

               
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                        disabled={loading}
                      />
                    </div>
                  </div>

                
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Password (optional)
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="password"
                        name="password"
                        placeholder="Leave blank to keep current password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <ClipLoader color="#ffffff" size={20} />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(false)}
                    disabled={loading}
                    className="px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;