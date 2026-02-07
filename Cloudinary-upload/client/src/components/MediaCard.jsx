const MediaCard = ({ post }) => {
  return (
    <div className="group bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">
      <div className="relative h-56 overflow-hidden">
        {post.mediaType === "image" ? (
          <img
            src={post.mediaUrl}
            className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <video
            src={post.mediaUrl}
            controls
            className="h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
      </div>

      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-lg truncate">{post.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {post.description}
        </p>
      </div>
    </div>
  );
};

export default MediaCard;
