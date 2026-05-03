import { useEffect } from "react";

const toastStyles = {
  success: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300",
  error: "bg-red-500/20 border-red-500/40 text-red-300",
  info: "bg-brand-purple/20 border-brand-purple/40 text-purple-300"
};

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast.message) return;
    const timer = setTimeout(onClose, 2800);
    return () => clearTimeout(timer);
  }, [toast.message, onClose]);

  if (!toast.message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`rounded-2xl border px-4 py-3 shadow-glow ${toastStyles[toast.type] || toastStyles.info}`}>
        {toast.message}
      </div>
    </div>
  );
};

export default Toast;