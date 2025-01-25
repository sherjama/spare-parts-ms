import React, { useState } from "react";
import authservice from "./services/auth.service.js";
import { useForm } from "react-hook-form";
import axios from "axios";

const App = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [File, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getUserDetails = async (data) => {
    const formData = new FormData();
    formData.append("logo", data.logo[0]);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("fermName", data.fermName);

    try {
      await authservice
        .CreateAccount(formData)
        .then((res) => setResponse(res.data));
    } catch (error) {
      console.log("App.jsx getUserDetails :", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(getUserDetails)}>
        <div>
          <label>Username:</label>
          <input
            {...register("username", { required: "Username is required" })}
            type="text"
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            type="email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label>Firm Name:</label>
          <input
            {...register("fermName", { required: "Firm name is required" })}
            type="text"
          />
          {errors.fermName && <p>{errors.fermName.message}</p>}
        </div>

        <div>
          <label>Logo:</label>
          <input
            name="logo"
            {...register("logo", { required: "Logo is required" })}
            type="file"
          />
          {errors.logo && <p>{errors.logo.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {error && (
        <div className="w-full mt-8 bg-red-700 text-white">Error: {error}</div>
      )}
      {response && (
        <div className="w-full mt-8 bg-green-700 text-white">
          Response: {JSON.stringify(response)}
        </div>
      )}
    </div>
  );
};

export default App;
