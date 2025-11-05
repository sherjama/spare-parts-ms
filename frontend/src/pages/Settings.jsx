import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Shield, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Heading } from "..";
import { logout } from "../store/authSlice.js";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../store/loadSlice.js";
import { useDispatch } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import authservice from "../services/auth.service";

const Settings = () => {
  const [currentPass, setCurrentPass] = useState();
  const [newPass, setNewPass] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cardsRef = useRef([]);
  cardsRef.current = [];

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Cards fade + rise effect
    tl.fromTo(
      cardsRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8 },
      "-=0.3"
    );
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  const onLogout = async () => {
    dispatch(setLoading(true));
    try {
      const data = await authservice.Logout();
      if (data) {
        dispatch(logout());
        dispatch(setLoading(false));
        navigate("/landing");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while logging out",
        { position: "top-center" }
      );
      dispatch(setLoading(false));
    }
  };

  const passwordChangeHandler = async () => {
    dispatch(setLoading(true));
    if (currentPass.length <= 0 || newPass.length <= 0) {
      toast.error("All fields are required", { position: "top-center" });
      dispatch(setLoading(false));
      return;
    }

    try {
      const res = await authservice.ChangePassword(currentPass, newPass);
      if (res) {
        console.log(res);

        toast.success(
          res?.response?.data?.message || "Password changed successfully",
          { position: "top-center" }
        );
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while logging out",
        { position: "top-center" }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-zinc-950 dark:via-zinc-900 dark:to-black text-gray-100 px-6 py-12 overflow-x-hidden bg-gray-400">
      {/* Header */}
      <Heading title={"Settings"} />
      <ToastContainer />
      {/* Settings Sections */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Theme changer */}
        <ThemeChanger />

        {/* Security Settings */}
        <div
          ref={addToRefs}
          className="relative bg-gradient-to-br from-zinc-900/70 to-zinc-800/40 backdrop-blur-md rounded-3xl p-6 border border-rose-500/30 shadow-[0_0_30px_rgba(244,63,94,0.2)] hover:shadow-[0_0_35px_rgba(244,63,94,0.4)] transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-rose-600/20 rounded-xl">
              <Shield className="text-rose-400" size={24} />
            </div>
            <h2 className="text-2xl font-nexar1 font-semibold text-rose-300">
              Security
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-1 font-nexar1">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                className="w-full bg-zinc-800/60 border border-gray-700 rounded-2xl px-4 py-2.5 text-gray-200 font-nexar1 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1 font-nexar1">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full bg-zinc-800/60 border border-gray-700 rounded-2xl px-4 py-2.5 text-gray-200 font-nexar1 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <button
              className="w-full mt-4 bg-rose-600 hover:bg-rose-500 active:scale-[0.98] transition-all rounded-2xl py-2.5 font-nexar1 font-semibold shadow-[0_0_12px_rgba(244,63,94,0.3)]"
              onClick={passwordChangeHandler}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="w-full grid-cols-2 flex items-center justify-center ">
        <button
          onClick={onLogout}
          className="mt-12 px-8 py-3 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:shadow-[0_0_35px_rgba(99,102,241,0.8)] transition-all duration-300 flex items-center gap-2"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative bg-gradient-to-br from-zinc-900/70 to-zinc-800/40 dark:from-zinc-800/60 dark:to-zinc-700/40 backdrop-blur-md rounded-3xl p-6 border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.2)] hover:shadow-[0_0_35px_rgba(99,102,241,0.4)] transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-600/20 rounded-xl">
          {theme === "dark" ? (
            <Moon className="text-indigo-400" size={24} />
          ) : theme === "light" ? (
            <Sun className="text-yellow-400" size={24} />
          ) : (
            <Monitor className="text-indigo-300" size={24} />
          )}
        </div>
        <h2 className="text-2xl font-nexar1 font-semibold text-indigo-300">
          Theme Changer
        </h2>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => setTheme("light")}
          className={`w-full bg-zinc-800/60 border border-gray-700 rounded-2xl px-4 py-2.5 font-nexar1 text-gray-200 hover:bg-zinc-700/50 transition-all ${
            theme === "light" ? "ring-2 ring-indigo-500" : ""
          }`}
        >
          ☀️ Light Mode
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`w-full bg-zinc-800/60 border border-gray-700 rounded-2xl px-4 py-2.5 font-nexar1 text-gray-200 hover:bg-zinc-700/50 transition-all ${
            theme === "dark" ? "ring-2 ring-indigo-500" : ""
          }`}
        >
          🌙 Dark Mode
        </button>

        <button
          onClick={() => setTheme("system")}
          className={`w-full bg-zinc-800/60 border border-gray-700 rounded-2xl px-4 py-2.5 font-nexar1 text-gray-200 hover:bg-zinc-700/50 transition-all ${
            theme === "system" ? "ring-2 ring-indigo-500" : ""
          }`}
        >
          💻 System Default
        </button>
      </div>
    </div>
  );
}

export default Settings;
