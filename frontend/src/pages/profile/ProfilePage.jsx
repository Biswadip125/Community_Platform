import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_API_URL } from "../../utils/constant";
import Post from "../../components/Post";

const ProfilePage = () => {
  const { user } = useUser();
  const [userPosts, setUserPosts] = useState([]);
  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_API_URL}/posts/user/${user?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setUserPosts(res.data.posts);
      }
    } catch (err) {
      console.log("Error in fetching user's posts", err);
      toast.error(err.response.data.message || "Failed to fetch user posts");
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);
  return (
    <div className="max-w-5xl min-h-screen mx-auto w-full mt-4 px-4">
      <div className="bg-white/30 backdrop-blur-xl shadow-md px-4 py-6 rounded-2xl flex md:flex-row flex-col md:gap-10 gap-5">
        <div className="w-20 h-20 md:h-24 md:w-24 bg-gray-400 rounded-full flex items-center justify-center text-4xl text-gray-100">
          {user?.name[0].toUpperCase()}
        </div>
        <div className="flex-1 flex flex-col justify-center gap-1">
          <p className="text-lg font-semibold">
            Name : <span className="font-normal">{user?.name}</span>
          </p>
          <p className="text-lg font-semibold">
            Email : <span className="font-normal">{user?.email}</span>
          </p>
          <p className="text-lg font-semibold">
            Bio :{" "}
            <span className="font-normal">{user?.bio || "Add a Bio"}</span>
          </p>
          <p className="text-sm text-gray-600">
            Joined on {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-2xl font-bold mb-4">
          Your Posts ({userPosts.length})
        </h1>
        <div className="flex flex-col gap-4">
          {userPosts.map((post) => (
            <Post postContent={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
