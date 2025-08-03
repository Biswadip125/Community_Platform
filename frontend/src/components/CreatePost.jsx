import { useState } from "react";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_API_URL } from "../utils/constant";
import { LoaderCircle } from "lucide-react";

const CreatePost = ({ fetchPosts }) => {
  const { user } = useUser();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Post content can not be empty");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${BACKEND_API_URL}/posts`,
        { content },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setContent("");
        fetchPosts();
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log("Error in creating post:", err);
      toast.error(err.response.data.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="w-full bg-white/10 backdrop-blur-xl rounded-xl p-4 shadow-md"
      onSubmit={handleCreatePost}
    >
      <textarea
        className="w-full p-3 resize-none outline-none max-h-[100px]"
        placeholder={`What's on your mind, ${user?.name || "dev"}`}
        rows={2}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 py-2 px-4 rounded-md text-white hover:bg-blue-600 mt-2 cursor-pointer disabled:opacity-50"
        disabled={loading}
      >
        {loading ? (
          <span className=" flex gap-2 items-center justify-center">
            Please Wait <LoaderCircle className="animate-spin" />
          </span>
        ) : (
          "Post"
        )}
      </button>
    </form>
  );
};

export default CreatePost;
