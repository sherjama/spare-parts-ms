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
    }
  }

  async Logout() {
    try {
      return await axios.post(`${this.userRoute}/logout-user`);
    } catch (error) {
      console.log("Logout : ", error);
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
    }
  }

  async RefreshToken() {
    try {
      return await axios.post(`${this.userRoute}/refresh-token`);
    } catch (error) {
      console.log("RefreshToken : ", error);
    }
  }

  async getCurrentUser() {
    try {
      return await axios.get(`${this.userRoute}/get-current-user`);
    } catch (error) {
      console.log("getCurrentUser : ", error);
    }
  }
}

const authservice = new AuthService();

export default authservice;
