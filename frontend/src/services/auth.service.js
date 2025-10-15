import axiosInstance from "./axiosInstance";
import { logout } from "../store/authSlice";

class AuthService {
  userRoute;

  constructor() {
    this.userRoute = "/users";
  }

  async CreateAccount({ username, email, password, fermName, logo }) {
    try {
      return await axiosInstance.post(
        `${this.userRoute}/register`,
        { username, email, password, fermName, logo },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } catch (error) {
      console.log("CreateAccount : ", error);
      throw error;
    }
  }

  async Login(data) {
    try {
      return await axiosInstance.post(`${this.userRoute}/login-user`, data, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log("Login : ", error);
      throw error;
    }
  }

  async Logout(dispatch) {
    try {
      await axiosInstance.post(`${this.userRoute}/logout-user`);
      dispatch(logout());
    } catch (error) {
      console.log("Logout : ", error);
      throw error;
    }
  }

  async ChangePassword({ oldPassword, newPassword }) {
    try {
      return await axiosInstance.patch(`${this.userRoute}/change-password`, {
        oldPassword,
        newPassword,
      });
    } catch (error) {
      console.log("ChangePassword : ", error);
      throw error;
    }
  }

  async UpdateUserDetail(updatedField) {
    try {
      return await axiosInstance.patch(
        `${this.userRoute}/update-user`,
        updatedField
      );
    } catch (error) {
      console.log("UpdateUserDetail : ", error);
      throw error;
    }
  }

  async ChangeLogo(logo) {
    try {
      return await axiosInstance.patch(
        `${this.userRoute}/change-logo`,
        { logo },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } catch (error) {
      console.log("ChangeLogo : ", error);
      throw error;
    }
  }

  async checkSession(dispatch) {
    try {
      const response = await axiosInstance.get(`/users/check-auth`);
      if (response.data?.data?.clear === false) {
        return true;
      } else {
        dispatch(logout());
        return false;
      }
    } catch (error) {
      if (error?.response?.data?.data?.clear) {
        dispatch(logout());
        return false;
      }

      if (error?.response?.status === 401) {
        dispatch(logout());
        return false;
      }
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await axiosInstance.get(`${this.userRoute}/get-current-user`);
    } catch (error) {
      console.log("getCurrentUser : ", error);
      throw error;
    }
  }
}

const authservice = new AuthService();

export default authservice;
