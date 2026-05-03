import { useState } from "react";
import { resolveThumbnailUrl } from "../utils/thumbnailUrls";

const ThumbnailCard = ({
  item,
  onDelete,
  onLike,
  showDelete = false,
  showLike = false,
  showAuthor = false
}) => {
  const [downloading, setDownloading] = useState(false);
  const thumbnailUrl = resolveThumbnailUrl(item.imageUrl);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(thumbnailUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = `${item.title || "thumbnail"}.jpg`;
      anchor.click();
      URL.revokeObjectURL(blobUrl);
    } catch {
      // silently ignore download errors
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="glass-card overflow-hidden rounded-3xl">
      <img
        src={thumbnailUrl}
        alt={item.title}
        className="w-full object-cover aspect-video"
        loading="lazy"
      />
      <div className="space-y-4 p-5">
        <div>
          <p className="font-semibold text-white truncate">{item.title}</p>
          {showAuthor && item.userId?.name && (
            <p className="text-xs text-slate-400 mt-0.5">by {item.userId.name}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {item.style && (
            <span className="rounded-full bg-brand-purple/20 px-2.5 py-0.5 text-xs text-purple-300 border border-brand-purple/30">
              {item.style}
            </span>
          )}
          {item.aspectRatio && (
            <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-slate-400 border border-white/10">
              {item.aspectRatio}
            </span>
          )}
          {item.mode && (
            <span className="rounded-full bg-brand-cyan/10 px-2.5 py-0.5 text-xs text-cyan-400 border border-brand-cyan/20">
              {item.mode}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 rounded-full bg-white/5 border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/10 hover:text-white transition disabled:opacity-50"
          >
            {downloading ? "Preparing..." : "Download"}
          </button>
          {showDelete && (
            <button
              onClick={() => onDelete(item._id)}
              className="rounded-full bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs text-red-400 hover:bg-red-500/20 transition"
            >
              Delete
            </button>
          )}
          {showLike && (
            <button
              onClick={() => onLike(item._id)}
              className="rounded-full bg-brand-pink/10 border border-brand-pink/20 px-3 py-2 text-xs text-pink-400 hover:bg-brand-pink/20 transition"
            >
              ♥ Like {item.likes || 0}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailCard;