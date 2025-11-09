import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

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
      const res = await axios.put("/api/users/edit", formData, {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">User Profile</h2>

        {/* Conditional Rendering */}
        {!isEditing ? (
          // 🟢 View Mode
          <div className="space-y-3 text-gray-800">
            <p>
              <span className="font-semibold">Name:</span> {formData.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {formData.email}
            </p>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                ✏️ Edit Profile
              </button>
              <button
                onClick={logout}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>

            <button
              onClick={() => navigate("/posts")}
              className="w-full mt-4 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300"
            >
              🏠 Go Home
            </button>
          </div>
        ) : (
          // ✏️ Edit Mode
          <form onSubmit={handleSave} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="New Password (optional)"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {message && (
          <p className="mt-3 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

