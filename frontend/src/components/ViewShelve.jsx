import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import shelvesService from "@/services/shelves.service";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllStock } from "@/store/stockSlice";

const ViewShelve = ({
  setShelveInView,
  title,
  parts = [],
  onDeleteSuccess,
}) => {
  const popupRef = useRef(null);
  const glowRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const userId = useSelector((state) => state.userdata.userdata.user._id);
  const dispatch = useDispatch();

  // Animation setup
  useEffect(() => {
    gsap.fromTo(
      popupRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
    );

    gsap.to(glowRef.current, {
      opacity: 0.6,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut",
    });

    gsap.to(".glow-text", {
      textShadow: "0px 0px 10px rgba(99,102,241,0.8)",
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    });
  }, []);

  // 🧹 Handle Shelf Deletion
  const handleDeleteShelf = async () => {
    if (!title || title.toLowerCase() === "none") {
      toast.error("The default 'None' shelf cannot be deleted.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete the shelf "${title}"?`
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      const res = await shelvesService
        .deleteShelve(title)
        .then(() => dispatch(fetchAllStock(userId)));
      toast.success(
        res.data?.message || `Shelf "${title}" deleted successfully`
      );
      setShelveInView(false);
      onDeleteSuccess?.(); // optional callback to refresh shelf list
    } catch (error) {
      console.error("Delete shelf error:", error);
      toast.error(error.response?.data?.message || "Failed to delete shelf");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 px-4">
      <ToastContainer />
      <div
        ref={popupRef}
        className="relative w-full max-w-3xl bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-950 dark:to-black border border-indigo-600/30 rounded-3xl shadow-[0_0_25px_rgba(99,102,241,0.4)] p-6 overflow-hidden from-zinc-500 via-zinc-600 to-slate-950"
      >
        <div
          ref={glowRef}
          className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-transparent to-indigo-500/10 pointer-events-none rounded-3xl"
        ></div>

        {/* Close Button */}
        <button
          onClick={() => setShelveInView(false)}
          className="absolute top-4 right-5 text-gray-400 hover:text-indigo-400 hover:scale-110 transition-all duration-200 text-2xl"
        >
          ✕
        </button>

        {/* Header */}
        <h3 className="text-center text-3xl font-nexar1 font-extrabold tracking-wide mb-6">
          <span className="text-gray-200">Parts in</span>{" "}
          <span className="relative inline-block text-indigo-400 px-2 font-nexar1">
            <span className="absolute inset-0 bg-indigo-500/20 blur-md rounded-full animate-pulse"></span>
            <span className="relative drop-shadow-[0_0_8px_rgba(99,102,241,0.7)] font-nexar1">
              {title || "Shelf"}
            </span>
          </span>{" "}
          <span className="text-gray-300">Shelf</span>
        </h3>

        {/* Table */}
        {parts.length > 0 ? (
          <div className="max-h-96 overflow-y-auto rounded-xl border border-gray-800/50 shadow-inner custom-scrollbar">
            <table className="w-full text-gray-300 text-sm">
              <thead className="sticky top-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-indigo-300 uppercase text-xs tracking-wider">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Part No.</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-right">Qty</th>
                </tr>
              </thead>
              <tbody>
                {parts.map((part, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-800/40 hover:bg-gradient-to-r hover:from-indigo-800/20 hover:to-transparent transition-colors duration-200"
                  >
                    <td className="py-2 px-4 dark:text-gray-500 text-gray-950">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4">{part.partNumber}</td>
                    <td className="py-2 px-4">{part.partName}</td>
                    <td className="py-2 px-4 text-right text-indigo-300 font-medium">
                      {part.Qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-10 text-lg">
            No parts found in this shelf ⚙️
          </p>
        )}

        {/* 🚫 Delete Button — hidden for "None" shelf */}
        {title?.toLowerCase() !== "none" && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleDeleteShelf}
              disabled={loading}
              className="px-6 py-3 dark:bg-red-600 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Delete Shelf"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewShelve;
