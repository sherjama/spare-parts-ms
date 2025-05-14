import axios from "axios";

class AuthService {
  userRoute;

  constructor() {
    this.userRoute = "/api/v1/users";
  }

  async CreateAccount({ username, email, password, fermName, logo }) {
    try {
      return await axios.post(
        `${this.userRoute}/register`,
        {
          username,
          email,
          password,
          fermName,
          logo,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      console.log("CreateAccount : ", error);
      return error;
    }
  }

  async Login({ username, email, password }) {
    try {
      return await axios.post(
        `${this.userRoute}/login-user`,
        {
          username,
          email,
          password,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      console.log("Login : ", error);
      return error;
    }
  }

  async Logout() {
    try {
      return await axios.post(`${this.userRoute}/logout-user`);
    } catch (error) {
      console.log("Logout : ", error);
      return error;
    }
  }

  async ChangePassword({ oldPassword, newPassword }) {
    try {
      return await axios.patch(`${this.userRoute}/change-password`, {
        oldPassword,
        newPassword,
      });
    } catch (error) {
      console.log("ChangePassword : ", error);
      return error;
    }
  }

  async UpdateUserDetail({ username, email, fermName }) {
    try {
      return await axios.patch(`${this.userRoute}/update-user`, {
        username,
        email,
        fermName,
      });
    } catch (error) {
      console.log("UpdateUserDetail : ", error);
      return error;
    }
  }

  async ChangeLogo(logo) {
    try {
      return await axios.patch(
        `${this.userRoute}/change-logo`,
        { logo },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      console.log("ChangeLogo : ", error);
      return error;
    }
  }

  async RefreshToken() {
    try {
      return await axios.post(`${this.userRoute}/refresh-token`);
    } catch (error) {
      console.log("RefreshToken : ", error);
      return error;
    }
  }

  async getCurrentUser() {
    try {
      return await axios.get(`${this.userRoute}/get-current-user`);
    } catch (error) {
      console.log("getCurrentUser : ", error);
      return error;
    }
  }
}

const authservice = new AuthService();

export default authservice;
