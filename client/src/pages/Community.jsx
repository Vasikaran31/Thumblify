import { useEffect, useState } from "react";
import { api } from "../api/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ThumbnailCard from "../components/ThumbnailCard";

const Community = ({ setToast }) => {
  const [items, setItems] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const data = await api.getCommunityFeed();
        setItems(data.thumbnails || []);
        setIdeas(data.trendingIdeas || []);
      } catch (err) {
        setToast({ type: "error", message: err.message });
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  const handleLike = async (id) => {
    try {
      const data = await api.likeThumbnail(id);
      setItems((prev) =>
        prev.map((item) => (item._id === id ? { ...item, likes: data.likes } : item))
      );
    } catch (err) {
      setToast({ type: "error", message: err.message });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-6 lg:grid-cols-[0.8fr,1.2fr]">
        <div className="glass-card rounded-[32px] p-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-cyan mb-4">Trending Ideas</p>
          <ul className="space-y-2">
            {ideas.map((idea, i) => (
              <li
                key={i}
                className="rounded-2xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-slate-300"
              >
                {idea}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card rounded-[32px] p-6 flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-pink mb-3">Public Feed</p>
          <h1 className="text-2xl font-bold text-white mb-2">Community Creations</h1>
          <p className="text-slate-400 text-sm">Browse and like thumbnails created by the community.</p>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner text="Loading community feed..." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ThumbnailCard
              key={item._id}
              item={item}
              showLike
              showAuthor
              onLike={handleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;