export default function ConfirmDialog({ title, message, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 sm:p-6 shadow-2xl border border-slate-100 animate-fade-in my-auto">
        <h2 className="text-lg font-bold text-slate-900 leading-tight">{title}</h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{message}</p>
        <div className="mt-6 flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="py-2.5 px-4 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="py-2.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-semibold text-white shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Confirm Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
