import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, authservice } from "../index.js";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import { setLoading } from "../store/loadSlice.js";

const AuthPage = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const inputFeilds = watch();

  // react router
  const navigate = useNavigate();
  const param = useParams();

  // redux
  const dispatch = useDispatch();

  // States
  const [isLogin, setisLogin] = useState();
  const [isSignUp, setisSignUp] = useState();
  const [passMismatch, setPassMismatch] = useState(false);

  // For check Login or SignUp
  useEffect(() => {
    if (param?.slug == "login") {
      setisLogin(true);
      setisSignUp(false);
    } else {
      setisSignUp(true);
      setisLogin(false);
    }
  });

  // For reset values of form
  useEffect(() => {
    reset();
  }, [isLogin, isSignUp]);

  // After Submiting A form
  const Signup = async (data) => {
    // Authentication for signing up
    if (data.password !== data.confirmPassword) {
      setPassMismatch(true);
      return;
    }
    dispatch(setLoading(false));
    try {
      const user = {
        username: data.username,
        email: data.email,
        password: data.password,
        fermName: data.fermName,
      };
      const isSigned = await authservice.CreateAccount(user);
      if (isSigned) {
        dispatch(login(isSigned.data.data));
        navigate("/controls/portfolio");
        dispatch(setLoading(false));
      }
    } catch (error) {
      toast.info(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  // Authentication Login
  const Login = async (data) => {
    dispatch(setLoading(true));
    try {
      const isLogedInUser = await authservice.Login(data);

      if (isLogedInUser) {
        dispatch(login(isLogedInUser.data.data));
        navigate("/controls/dashboard");
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      toast.info(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    return () => {
      reset();
      setPassMismatch(false);
    };
  }, [isLogin]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-transparent">
      <div className="max-sm:w-72 max-md:w-[380px] md:w-[500px] mt-12 h-min mx-auto p-6 bg-[#191919] rounded-xl shadow-md flex flex-col items-center justify-center backdrop-blur-md bg-white/10 border border-white/30  ">
        <ToastContainer />
        <div>
          <h1 className="text-5xl font-nexar3 text-center mb-4 text-slate-200">
            Sign {isLogin ? "In" : "Up"}
          </h1>
        </div>

        <div className="flex w-4/5 justify-evenly items-center flex-wrap max-[1360px]:flex-col gap-4 lg:gap-1">
          {isSignUp && (
            <form
              onSubmit={handleSubmit(Signup)}
              className="w-full "
              autoComplete="off"
            >
              <div className="mb-8">
                <label
                  htmlFor="email"
                  className={`${
                    inputFeilds.username ? " " : "hidden"
                  } Auth-label text-sm font-nexar1 text-gray-500`}
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  {...register("username", {
                    required: "username is required",
                  })}
                  className="w-full p-2 border-b focus:border-b-blue-500"
                  placeholder="Username"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="mb-8">
                <label
                  htmlFor="email"
                  className={`${
                    inputFeilds.email ? " " : "hidden"
                  } Auth-label text-sm font-nexar1 text-gray-500 `}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full p-2 border-b focus:border-b-blue-500 text-slate-200"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-8">
                <label
                  htmlFor="email"
                  className={`${
                    inputFeilds.password ? " " : "hidden"
                  } Auth-label text-sm font-nexar1 text-gray-500`}
                >
                  Choose a password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full p-2 border-b focus:border-b-blue-500"
                  placeholder="Choose a password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mb-8">
                <label
                  htmlFor="email"
                  className={`${
                    inputFeilds.confirmPassword ? " " : "hidden"
                  } Auth-label text-sm font-nexar1 text-gray-500`}
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                  })}
                  className="w-full p-2 border-b focus:border-b-blue-500"
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
                {passMismatch && (
                  <p className="text-red-500 text-sm">Password mismatch</p>
                )}
              </div>

              <div className="mb-8">
                <label
                  htmlFor="email"
                  className={`${
                    inputFeilds.fermName ? " " : "hidden"
                  } Auth-label text-sm font-nexar1 text-gray-500`}
                >
                  Ferm name
                </label>
                <input
                  id="fermname"
                  type="text"
                  {...register("fermName", {
                    required: "Ferm Name is required",
                  })}
                  className="w-full p-2 border-b focus:border-b-blue-500"
                  placeholder="Ferm Name"
                />
                {errors.fermName && (
                  <p className="text-red-500 text-sm">
                    {errors.fermName.message}
                  </p>
                )}
              </div>

              <Button
                textColor="text-blue-400"
                text="Sign Up"
                className="border-gray-300 font-nexar3"
              />
            </form>
          )}

          {isLogin && (
            <form
              onSubmit={handleSubmit(Login)}
              className="w-full "
              autoComplete="off"
            >
              <div className="mb-8">
                <label
                  htmlFor="email"
                  className={`${
                    inputFeilds.email ? " " : "hidden"
                  } Auth-label text-sm font-nexar1 text-gray-500`}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full p-2 border-b focus:border-b-blue-500"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-8">
                <label
                  htmlFor="email"
                  className={`${
                    inputFeilds.password ? " " : "hidden"
                  } Auth-label text-sm font-nexar1 text-gray-500`}
                >
                  password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full p-2 border-b focus:border-b-blue-500"
                  placeholder="Choose a password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                textColor="text-blue-400"
                text="Login"
                className="border-gray-300 font-nexar3"
              />
            </form>
          )}
        </div>
        <p className="text-center text-sm mt-8 text-slate-200">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <NavLink
            className="text-blue-500 pl-2"
            to={isLogin ? "/auth/signup" : "/auth/login"}
          >
            {isLogin ? "SignUp" : "Login"}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
