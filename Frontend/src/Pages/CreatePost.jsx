import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/NavBar"; 

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
      <Navbar /> {/* ✅ Navbar at the top */}

      <div className="flex justify-center mt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Create New Post</h2>

          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border w-full p-2 rounded mb-4"
          />

          <textarea
            placeholder="Write your content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border w-full p-2 rounded mb-4 h-40 resize-none"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold px-4 py-2 rounded text-white ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
