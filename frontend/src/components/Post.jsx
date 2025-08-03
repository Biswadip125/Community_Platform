import { Dot } from "lucide-react";
import React from "react";
import { timeAgo } from "../utils/timeAgo";

const Post = ({ postContent }) => {
  return (
    <div className="w-full bg-white/10 min-h-[120px] backdrop-blur-2xl rounded-xl shadow-md p-4 flex flex-col gap-4">
      <div className="flex gap-1 items-center">
        <h3 className="text-xl font-semibold">{postContent?.author?.name}</h3>
        <p className="flex items-center justify-center">
          <Dot size={16} className="mt-1" />
          {timeAgo(postContent?.createdAt)}
        </p>
      </div>
      <p>{postContent?.content}</p>
    </div>
  );
};

export default Post;
