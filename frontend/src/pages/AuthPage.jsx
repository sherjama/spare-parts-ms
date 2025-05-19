import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaCamera } from "react-icons/fa";
import { RiFacebookFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { Button } from "../index.js";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import authservice from "../services/auth.service.js";

const AuthPage = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
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
  const [passMismatch, setPassMismatch] = useState();
  const [PrevImage, setPrevImage] = useState();
  const [image, setImage] = useState();

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

  // for Logo Image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImage(file ? file : null);
    setValue("logo", file);

    setPrevImage(file ? URL.createObjectURL(file) : null);
  };

  // Authentication for signing up
  const signUp = async (data) => {
    if (data.password !== data.confirmPassword) {
      setPassMismatch(true);
      return;
    }

    try {
      const user = {
        username: data.username,
        email: data.email,
        password: data.password,
        fermName: data.fermName,
        logo: data.logo,
      };
      const isSigned = await authservice.CreateAccount(user);

      if (isSigned) {
        dispatch(login(isSigned?.data));
        navigate("/contact");
      }
    } catch (error) {
      toast.info(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  // Authentication of user login
  const login = async (data) => {
    try {
    } catch (error) {}
  };

  // After Submiting A form
  const onSubmit = async (data) => {
    if (isLogin) {
      await login(data);
    }

    if (isSignUp) {
      await signUp(data);
    }
  };

  useEffect(() => {
    return () => {
      reset();
      setPassMismatch(Boolean);
      setPrevImage("");
      setImage("");
    };
  }, [isLogin]);

  return (
    <div className="w-[60vw] mt-12 h-min mx-auto p-6 bg-[#191919] rounded-xl shadow-md flex flex-col items-center justify-center backdrop-blur-md bg-white/10 border border-white/30  ">
      <ToastContainer />
      <div>
        <h1 className="lg:text-5xl text-2xl font-nexar3 text-center mb-4 text-slate-200">
          Sign {isLogin ? "In" : "Up"} to Nexar
        </h1>
        <p className="text-center mb-6 text-slate-200">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <NavLink
            className="text-blue-500 pl-2"
            to={isLogin ? "/auth/signup" : "/auth/login"}
          >
            {isLogin ? "SignUp" : "Login"}
          </NavLink>
        </p>
      </div>

      <div className="flex w-full justify-evenly items-center flex-wrap gap-4 lg:gap-1">
        {isSignUp && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full sm:w-1/2 lg:w-1/3 "
          >
            <div className="w-full  flex items-center justify-center flex-col mb-10">
              <label
                className={`size-40 flex items-center justify-center ${
                  !image ? "border-2 border-dashed border-gray-300" : " "
                } rounded-full cursor-pointer hover:border-blue-500`}
              >
                {!image ? (
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    onChange={handleImageChange}
                    // {...register("logo", { required: "Ferm Logo is required" })}
                  />
                ) : (
                  <img
                    src={PrevImage}
                    alt="Preview"
                    className="size-40 rounded-full object-cover mb-4 hover:backdrop-blur-3xl hover:opacity-50"
                  />
                )}
                {!image && (
                  <span className="text-gray-400 flex items-center justify-center flex-col-reverse">
                    Ferm logo
                    <FaCamera size={50} />
                  </span>
                )}
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.logo.message}</p>
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
                onChange={handleImageChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

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
                  inputFeilds.password ? " " : "hidden"
                } Auth-label text-sm font-nexar1 text-gray-500`}
              >
                Choose a password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
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
            onSubmit={handleSubmit(onSubmit)}
            className="w-full sm:w-1/2 lg:w-1/3"
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
                {...register("password", { required: "Password is required" })}
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

        <div className="mt-6 text-center w-auto max-[1160px]:hidden">
          <div className={`${isLogin ? "h-20" : "h-44"} border w-0`}></div>
          <span className="text-gray-500 relative right-[5px] font-nexar2">
            or
          </span>
          <div className={`${isLogin ? "h-20" : "h-44"} border w-0`}></div>
        </div>

        <div
          className="w-min-content
        "
        >
          <div className="flex justify-center gap-4 mt-6 flex-col  items-center">
            <button className="flex items-center  gap-2  bg-blue-500 text-white w-96 ">
              <span className="bg-white ml-[2px] py-3 px-3 ">
                <FcGoogle size={27} />
              </span>
              <span className="py-4  font-nexar1  w-11/12">
                Continue with Google
              </span>
            </button>
            <button className="flex items-center  gap-2 bg-blue-900  text-white w-96 ">
              <span className="bg-white  ml-[2px] py-3 px-3">
                <RiFacebookFill size={27} color="darkBlue" />
              </span>
              <span className="py-4   font-nexar1 w-11/12">
                Continue with Facebook
              </span>
            </button>
          </div>
        </div>
      </div>
      {isSignUp && (
        <div className="font-nexar1 text-[12px] leading-4 text-gray-500 mt-10">
          <p>
            * By signing up, you agree to our <a href="#">Terms of Use</a> and
            acknowledge you’ve read our <a href="#">Privacy Policy</a>.
          </p>
          <p>
            This site is protected by reCAPTCHA Enterprise.
            <a href="#">Google's Privacy Policy</a> and
            <a href="#">Terms of Service</a> apply.
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
