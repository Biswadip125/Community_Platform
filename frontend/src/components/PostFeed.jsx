import Post from "./Post";

const PostFeed = ({ posts }) => {
  return (
    <div className="flex flex-col gap-4">
      {posts.length > 0
        ? posts.map((post) => <Post key={post._id} postContent={post} />)
        : "No Posts yet"}
    </div>
  );
};

export default PostFeed;
