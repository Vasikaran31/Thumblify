import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { aspectRatios, palettes, styles } from "../utils/constants";
import { resolveThumbnailUrl } from "../utils/thumbnailUrls";

const defaultGenerateState = {
  title: "",
  aspectRatio: "16:9",
  style: "Bold",
  colors: palettes[0],
  prompt: "",
  sourceImage: ""
};

const defaultRecreateState = {
  title: "",
  aspectRatio: "16:9",
  style: "Bold",
  colors: palettes[0],
  sourceImage: "",
  changeRequest: ""
};

const Generate = ({ setToast }) => {
  const { updateCredits } = useAuth();
  const [activeTab, setActiveTab] = useState("generate");
  const [generateForm, setGenerateForm] = useState(defaultGenerateState);
  const [recreateForm, setRecreateForm] = useState(defaultRecreateState);
  const [preview, setPreview] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [previewRetryCount, setPreviewRetryCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!preview?.imageUrl) {
      setPreviewSrc("");
      setPreviewRetryCount(0);
    } else {
      setPreviewSrc(resolveThumbnailUrl(preview.imageUrl));
      setPreviewRetryCount(0);
    }
  }, [preview]);

  useEffect(() => {
    if (!preview?.imageUrl || previewRetryCount === 0) return;
    if (previewRetryCount > 4) return;

    const timer = setTimeout(() => {
      setPreviewSrc(`${resolveThumbnailUrl(preview.imageUrl)}&_r=${previewRetryCount}`);
    }, 1200 * previewRetryCount);

    return () => clearTimeout(timer);
  }, [previewRetryCount]);

  const handleColorSelect = (tab, palette) => {
    if (tab === "generate") {
      setGenerateForm((prev) => ({ ...prev, colors: palette }));
    } else {
      setRecreateForm((prev) => ({ ...prev, colors: palette }));
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.generateThumbnail({ ...generateForm, mode: "generate" });
      setPreview(data.thumbnail);
      updateCredits(data.credits);
      setToast({ type: "success", message: "Thumbnail generated!" });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleRecreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.generateThumbnail({ ...recreateForm, mode: "recreate" });
      setPreview(data.thumbnail);
      updateCredits(data.credits);
      setToast({ type: "success", message: "Thumbnail recreated!" });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-pink mb-1">Studio</p>
          <h1 className="text-3xl font-bold text-white">Generate Thumbnail</h1>
        </div>
        <div className="flex rounded-full bg-white/5 border border-white/10 p-1 gap-1">
          {["generate", "recreate"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-sm font-medium capitalize transition ${
                activeTab === tab
                  ? "bg-gradient-to-r from-brand-pink to-brand-purple text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="glass-card rounded-[32px] p-6">
          {activeTab === "generate" ? (
            <form onSubmit={handleGenerate} className="space-y-5">
              <InputBlock
                label="Video / Content Title"
                value={generateForm.title}
                onChange={(e) => setGenerateForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="e.g. 10 Ways to Master React"
              />
              <SelectBlock
                label="Aspect Ratio"
                value={generateForm.aspectRatio}
                onChange={(e) => setGenerateForm((p) => ({ ...p, aspectRatio: e.target.value }))}
                options={aspectRatios}
              />
              <SelectBlock
                label="Style"
                value={generateForm.style}
                onChange={(e) => setGenerateForm((p) => ({ ...p, style: e.target.value }))}
                options={styles}
              />
              <PaletteBlock
                label="Color Palette"
                value={generateForm.colors}
                onSelect={(palette) => handleColorSelect("generate", palette)}
              />
              <InputBlock
                label="Optional Prompt"
                value={generateForm.prompt}
                onChange={(e) => setGenerateForm((p) => ({ ...p, prompt: e.target.value }))}
                placeholder="Extra creative direction..."
              />
              <InputBlock
                label="Optional Image Upload URL"
                value={generateForm.sourceImage}
                onChange={(e) => setGenerateForm((p) => ({ ...p, sourceImage: e.target.value }))}
                placeholder="https://image.pollinations.ai/..."
              />
              <SubmitButton loading={loading} text="Generate Thumbnail" />
            </form>
          ) : (
            <form onSubmit={handleRecreate} className="space-y-5">
              <InputBlock
                label="Video / Content Title"
                value={recreateForm.title}
                onChange={(e) => setRecreateForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="e.g. React vs Vue 2025"
              />
              <InputBlock
                label="Optional Image Upload URL"
                value={recreateForm.sourceImage}
                onChange={(e) => setRecreateForm((p) => ({ ...p, sourceImage: e.target.value }))}
                placeholder="https://image.pollinations.ai/..."
              />
              <SelectBlock
                label="Aspect Ratio"
                value={recreateForm.aspectRatio}
                onChange={(e) => setRecreateForm((p) => ({ ...p, aspectRatio: e.target.value }))}
                options={aspectRatios}
              />
              <SelectBlock
                label="Style"
                value={recreateForm.style}
                onChange={(e) => setRecreateForm((p) => ({ ...p, style: e.target.value }))}
                options={styles}
              />
              <PaletteBlock
                label="Color Palette"
                value={recreateForm.colors}
                onSelect={(palette) => handleColorSelect("recreate", palette)}
              />
              <InputBlock
                label="Change Request"
                value={recreateForm.changeRequest}
                onChange={(e) => setRecreateForm((p) => ({ ...p, changeRequest: e.target.value }))}
                placeholder="Make it more dramatic, change background to space..."
              />
              <SubmitButton loading={loading} text="Recreate Thumbnail" />
            </form>
          )}
        </div>

        <div className="glass-card rounded-[32px] p-6 flex flex-col gap-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-pink">Preview</p>

          {preview ? (
            <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <img
                src={previewSrc}
                alt={preview.title}
                className="w-full object-cover"
                onError={() => {
                  if (previewRetryCount < 4) {
                    setPreviewRetryCount((c) => c + 1);
                  }
                }}
              />
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center rounded-2xl bg-white/5 border border-white/10 min-h-48">
              <p className="text-slate-500 text-sm text-center px-4">
                Your thumbnail preview will appear here after generation.
              </p>
            </div>
          )}

          {preview?.prompt && (
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-purple mb-2">
                Optimized Prompt
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">{preview.prompt}</p>
            </div>
          )}

          <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-2">Tips</p>
            <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
              <li>Use a clear, descriptive title for best results.</li>
              <li>Try different styles and palettes to find your look.</li>
              <li>Paste a Pollinations image URL to use as a reference.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputBlock = ({ label, value, onChange, placeholder }) => {
  const isOptional = label.startsWith("Optional") || label === "Change Request";
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={!isOptional}
        className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple/60 focus:ring-1 focus:ring-brand-purple/30 transition"
      />
    </div>
  );
};

const SelectBlock = ({ label, value, onChange, options }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl bg-slate-900 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-purple/60 transition"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

const PaletteBlock = ({ label, value, onSelect }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <div className="grid grid-cols-5 gap-2">
        {palettes.map((palette, i) => {
          const isSelected = JSON.stringify(palette) === JSON.stringify(value);
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(palette)}
              className={`flex gap-0.5 rounded-xl overflow-hidden h-8 border-2 transition ${
                isSelected ? "border-brand-pink scale-105" : "border-transparent hover:border-white/30"
              }`}
            >
              {palette.map((color) => (
                <span key={color} className="flex-1 h-full" style={{ backgroundColor: color }} />
              ))}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const SubmitButton = ({ loading, text }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-full bg-gradient-to-r from-brand-pink to-brand-purple py-3 font-semibold text-white hover:opacity-90 transition disabled:opacity-50"
    >
      {loading ? "Generating..." : text}
    </button>
  );
};

export default Generate;