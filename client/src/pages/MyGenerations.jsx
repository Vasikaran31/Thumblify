import { useEffect, useState } from "react";
import { api } from "../api/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ThumbnailCard from "../components/ThumbnailCard";

const MyGenerations = ({ setToast }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getMyThumbnails();
        setItems(data.thumbnails || []);
      } catch (err) {
        setToast({ type: "error", message: err.message });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.deleteThumbnail(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
      setToast({ type: "success", message: "Thumbnail deleted" });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-pink mb-1">Library</p>
        <h1 className="text-3xl font-bold text-white">My Generations</h1>
      </div>

      {loading ? (
        <LoadingSpinner text="Loading your library..." />
      ) : items.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ThumbnailCard
              key={item._id}
              item={item}
              showDelete
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-2xl font-semibold text-slate-300 mb-2">No generations yet</p>
          <p className="text-slate-500">Head to the Generate page to create your first thumbnail.</p>
        </div>
      )}
    </div>
  );
};

export default MyGenerations;