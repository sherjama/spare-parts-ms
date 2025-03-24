import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { Button } from "../index.js";
import { NavLink, useParams } from "react-router-dom";

const AuthPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLogin, setisLogin] = useState();
  const [isSignUp, setisSignUp] = useState();
  const param = useParams();
  useEffect(() => {
    checkLoginSignUp();
  });

  useEffect(() => {
    reset();
  }, [isLogin, isSignUp]);

  const checkLoginSignUp = () => {
    if (param?.slug == "login") {
      setisLogin(true);
      setisSignUp(false);
    } else {
      setisSignUp(true);
      setisLogin(false);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-[60vw] mx-auto p-6 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center">
      <div>
        <h1 className="text-5xl font-nexar3 text-center mb-4 ">
          Sign Up to Nexar
        </h1>
        <p className="text-center mb-6">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <NavLink
            className="text-blue-500 pl-2"
            to={isLogin ? "/auth/signup" : "/auth/login"}
          >
            {isLogin ? "SignUp" : "Login"}
          </NavLink>
        </p>
      </div>

      <div className="flex w-full justify-evenly items-center flex-wrap gap-4">
        {isSignUp && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full sm:w-1/2 lg:w-1/3"
          >
            <div className="mb-8">
              <label
                htmlFor="email"
                className="Auth-label text-sm font-nexar1 text-gray-500"
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
                className="Auth-label text-sm font-nexar1 text-gray-500"
              >
                Confirm Email
              </label>
              <input
                id="confirmEmail"
                type="email"
                {...register("confirmEmail", {
                  required: "Confirm email is required",
                })}
                className="w-full p-2 border-b focus:border-b-blue-500"
                placeholder="Confirm Email"
              />
              {errors.confirmEmail && (
                <p className="text-red-500 text-sm">
                  {errors.confirmEmail.message}
                </p>
              )}
            </div>

            <div className="mb-8">
              <label
                htmlFor="email"
                className="Auth-label text-sm font-nexar1 text-gray-500"
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
                className="Auth-label text-sm font-nexar1 text-gray-500"
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
                className="Auth-label text-sm font-nexar1 text-gray-500"
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
                className="Auth-label text-sm font-nexar1 text-gray-500"
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
    </div>
  );
};

export default AuthPage;
