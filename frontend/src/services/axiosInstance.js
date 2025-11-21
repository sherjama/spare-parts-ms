import axios from "axios";

const apiBaseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
});

const plainAxios = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    const url = originalRequest.url || "";

    if (
      url.includes("/users/refresh-token") ||
      url.includes("/users/login-user") ||
      url.includes("/users/logout-user") ||
      url.includes("/users/register-user")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await plainAxios.get("/users/refresh-token");
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      if (refreshError.response?.data?.data?.clear) {
        window.location.href = "/auth/login";
      }
      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;
