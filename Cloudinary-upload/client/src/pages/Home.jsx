import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";
import MediaForm from "../components/MediaForm";
import MediaCard from "../components/MediaCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-10">
        {/* Hero */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Media Gallery</h1>
          <p className="text-gray-600">
            Upload and share your images & videos
          </p>
        </div>

        {/* Upload */}
        <MediaForm onSuccess={fetchPosts} />

        {/* Feed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <MediaCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
