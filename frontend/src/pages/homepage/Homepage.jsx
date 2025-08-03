import axios from "axios";
import CreatePost from "../../components/CreatePost";
import PostFeed from "../../components/PostFeed";
import { BACKEND_API_URL } from "../../utils/constant";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Post from "../../components/Post";

const Homepage = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${BACKEND_API_URL}/posts`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        setPosts(res.data.posts);
      }
    } catch (err) {
      console.log("Error in fetching posts:", err);
      toast.error(err.resposne.data.message || "Failed to fetch posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="h-full max-w-5xl w-full mx-auto px-8 flex flex-col gap-4">
      <CreatePost fetchPosts={fetchPosts} />
      <PostFeed posts={posts} />
    </div>
  );
};

export default Homepage;
