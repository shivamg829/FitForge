import { useEffect, useState } from "react";

const ErrorScreen = ({
  title = "Something went wrong",
  message = "Please try again.",
  ctaLabel = "Go to Login",
  onCta,
  showMeta = true,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-opacity " +
        (visible ? "opacity-100" : "opacity-0")
      }
    >
      <div
        className={
          "w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-black/10 overflow-hidden transform transition-transform " +
          (visible ? "translate-y-0" : "translate-y-6")
        }
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
              <div className="h-8 w-8 rounded-xl bg-red-500/20 border border-red-500/30 animate-pulse" />
              <span className="absolute text-2xl">⚠️</span>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-extrabold text-gray-900">{title}</h2>
              <p className="mt-2 text-gray-600 leading-relaxed">{message}</p>
            </div>
          </div>

          {showMeta && (
            <div className="mt-5 rounded-2xl bg-gray-50 border border-gray-200 p-4">
              <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500 animate-bounce" />
                Please sign in again or retry.
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onCta}
              className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-bold hover:bg-gray-900 transition"
            >
              {ctaLabel}
            </button>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-[pulse_1.5s_ease-in-out_infinite]" />
      </div>
    </div>
  );
};

export default ErrorScreen;

