const Post = require("../Models/postModel.js")

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name").sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", "name email");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Server error while fetching post" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      console.log("❌ Missing title/content");
      return res.status(400).json({ message: "Please provide both title and content" });
    }

    if (!req.user || !req.user._id) {
      console.log("❌ req.user is undefined!");
      return res.status(401).json({ message: "Not authorized" });
    }

    const post = await Post.create({
      title,
      content,
      user: req.user._id,
    });

    const populatedPost = await post.populate("user", "name email");

    console.log("✅ Post created successfully:", populatedPost);
    res.status(201).json(populatedPost);
  } catch (error) {
    console.error("❌ Backend error while creating post:", error.message);
    res.status(500).json({ message: "Server error while creating post", error: error.message });
  }
};


exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    post.content = req.body.content || post.content;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
