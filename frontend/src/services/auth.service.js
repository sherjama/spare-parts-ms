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
      throw error;
    }
  }

  async Login(data) {
    try {
      return await axios.post(`${this.userRoute}/login-user`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("Login : ", error);
      throw error;
    }
  }

  async Logout() {
    try {
      return await axios.post(`${this.userRoute}/logout-user`);
    } catch (error) {
      console.log("Logout : ", error);
      throw error;
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
      throw error;
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
      throw error;
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
      throw error;
    }
  }

  async RefreshToken(refreshToken) {
    console.log(refreshToken);

    try {
      return await axios.post(
        `${this.userRoute}/refresh-token`,
        { refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log("RefreshToken : ", error);
      throw error;
    }
  }

  async checkSession(refreshToken) {
    try {
      const response = await axios.get(`${this.userRoute}/check-auth`, {
        params: { refreshToken },
      });

      if (response.data.data.clear) {
        localStorage.clear();
      } else {
        return true;
      }
    } catch (error) {
      console.log("checkSession : ", error);

      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await axios.get(`${this.userRoute}/get-current-user`);
    } catch (error) {
      console.log("getCurrentUser : ", error);
      throw error;
    }
  }
}

const authservice = new AuthService();

export default authservice;
