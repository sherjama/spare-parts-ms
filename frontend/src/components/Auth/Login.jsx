import React from "react";

const Login = () => {
  return (
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
      <div class="flex justify-center mb-6">
        <div class="bg-gray-200 p-4 rounded-full">
          <i class="fas fa-sign-in-alt text-2xl"></i>
        </div>
      </div>
      <h2 class="text-center text-2xl font-semibold mb-2">
        Sign in with email
      </h2>
      <p class="text-center text-gray-600 mb-6">
        Make a new doc to bring your words, data, and teams together. For free
      </p>
      <form>
        <div class="mb-4">
          <label class="block relative">
            <input
              class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              type="email"
            />
            <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </label>
        </div>
        <div class="mb-4">
          <label class="block relative">
            <input
              class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              type="password"
            />
            <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <i class="fas fa-eye absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </label>
        </div>
        <div class="flex justify-end mb-6">
          <a class="text-blue-500" href="#">
            Forgot password?
          </a>
        </div>
        <button class="w-full bg-black text-white py-3 rounded-lg font-semibold mb-4">
          Get Started
        </button>
      </form>
      <div class="text-center text-gray-500 mb-4">Or sign in with</div>
      <div class="flex justify-center space-x-4">
        <button class="bg-white border rounded-full p-3">
          <img
            alt="Google logo"
            height="24"
            src="https://storage.googleapis.com/a1aa/image/kpk7CiB7CyOKMl8EeQAj4eQsjYI-JKWOMTHmIOvFXGA.jpg"
            width="24"
          />
        </button>
        <button class="bg-white border rounded-full p-3">
          <img
            alt="Facebook logo"
            height="24"
            src="https://storage.googleapis.com/a1aa/image/jshkJb5OZH1WV_3Alm9c2m6IPD6ME-XN5N3od8qZ3co.jpg"
            width="24"
          />
        </button>
        <button class="bg-white border rounded-full p-3">
          <img
            alt="Apple logo"
            height="24"
            src="https://storage.googleapis.com/a1aa/image/WPdCNpOgwPVHFU9mqJm3voGPrNzTP5JxKAgKp1tcG-Q.jpg"
            width="24"
          />
        </button>
      </div>
    </div>
  );
};

export default Login;
