import { Loader2 } from "lucide-react";
import Post from "./Post";

const PostFeed = ({ posts }) => {
  return (
    <div className="flex flex-col gap-4">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} postContent={post} />)
      ) : (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-blue-500 w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default PostFeed;
