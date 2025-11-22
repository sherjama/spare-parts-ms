import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  authservice,
  errorNormalizer as getErrorMessage,
} from "../index.js";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import { setLoading } from "../store/loadSlice.js";

/* ---------------- Reusable Input Component ---------------- */
const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  errors,
  fields,
}) => {
  return (
    <div className="mb-8">
      {/* Floating Label */}
      <label
        htmlFor={id}
        className={`block text-sm font-nexar1 text-gray-400 transition-all duration-200 
          ${fields[id] ? "opacity-100 mb-1" : "opacity-0 -mb-3"}`}
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        {...register(id, { required: `${label} is required` })}
        placeholder={placeholder}
        className="w-full p-2 border-b border-gray-400 focus:border-b-blue-500 
          bg-transparent text-slate-200 outline-none transition"
      />

      {/* Error Text */}
      {errors[id] && (
        <p className="text-red-400 text-sm mt-1">{errors[id].message}</p>
      )}
    </div>
  );
};

const AuthPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const fields = watch();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();

  // local states
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLocalLoading] = useState(false);
  const [passMismatch, setPassMismatch] = useState(false);

  /* ---------------- Detect Form Mode ---------------- */
  useEffect(() => {
    setIsLogin(slug === "login");
    reset();
    setPassMismatch(false);
  }, [slug]);

  /* ---------------- Signup Handler ---------------- */
  const handleSignup = async (data) => {
    if (data.password !== data.confirmPassword) {
      setPassMismatch(true);
      return;
    }

    setLocalLoading(true);
    dispatch(setLoading(true));

    try {
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
        fermName: data.fermName,
      };

      const res = await authservice.CreateAccount(payload);

      dispatch(login(res.data.data));
      navigate("/controls/portfolio");
    } catch (err) {
      toast.error(getErrorMessage(err), { position: "top-center" });
    }

    setLocalLoading(false);
    dispatch(setLoading(false));
  };

  /* ---------------- Login Handler ---------------- */
  const handleLogin = async (data) => {
    setLocalLoading(true);
    dispatch(setLoading(true));

    try {
      const res = await authservice.Login(data);

      dispatch(login(res.data.data));
      navigate("/controls/dashboard");
    } catch (err) {
      toast.error(getErrorMessage(err), { position: "top-center" });
    }

    setLocalLoading(false);
    dispatch(setLoading(false));
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div
        className="max-sm:w-72 max-md:w-[380px] md:w-[500px] mt-12 p-6 
        bg-[#191919] rounded-xl shadow-md backdrop-blur-md bg-white/10 
        border border-white/30"
      >
        <ToastContainer />

        <h1 className="text-5xl font-nexar3 text-center mb-10 text-slate-200">
          {isLogin ? "Sign In" : "Sign Up"}
        </h1>

        {/* ---------------- SIGNUP FORM ---------------- */}
        {!isLogin ? (
          <form onSubmit={handleSubmit(handleSignup)} autoComplete="off">
            <InputField
              id="username"
              label="Username"
              placeholder="Username"
              register={register}
              errors={errors}
              fields={fields}
            />

            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="Email"
              register={register}
              errors={errors}
              fields={fields}
            />

            <InputField
              id="password"
              label="Choose a password"
              type="password"
              placeholder="Choose a password"
              register={register}
              errors={errors}
              fields={fields}
            />

            <InputField
              id="confirmPassword"
              label="Confirm password"
              type="password"
              placeholder="Confirm password"
              register={register}
              errors={errors}
              fields={fields}
            />

            {passMismatch && !errors.confirmPassword && (
              <p className="text-red-400 text-sm -mt-6 mb-4">
                Passwords do not match
              </p>
            )}

            <InputField
              id="fermName"
              label="Ferm Name"
              placeholder="Ferm Name"
              register={register}
              errors={errors}
              fields={fields}
            />

            <Button
              loading={loading}
              text="Sign Up"
              textColor="text-blue-400"
              className="border-gray-300 font-nexar3 mt-6"
              fullWidth
            />
          </form>
        ) : (
          /* ---------------- LOGIN FORM ---------------- */
          <form onSubmit={handleSubmit(handleLogin)} autoComplete="off">
            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="Email"
              register={register}
              errors={errors}
              fields={fields}
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              register={register}
              errors={errors}
              fields={fields}
            />

            <Button
              loading={loading}
              text="Login"
              textColor="text-blue-400"
              className="border-gray-300 font-nexar3 mt-4"
              fullWidth
            />
          </form>
        )}

        <p className="text-center text-sm mt-8 text-slate-200">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <NavLink
            className="text-blue-500 pl-2"
            to={isLogin ? "/auth/signup" : "/auth/login"}
          >
            {isLogin ? "Sign Up" : "Login"}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
