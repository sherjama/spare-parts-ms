import axios from "axios";

class AuthService {
  userRoute = "/api/v1/users";
  loginRoute = "/login-user";
  logoutRoute = "/logout-user";
  refreshTokenRoute = "/refresh-token";
  changePasswordRoute = "/change-password";
  getCurrentUserRoute = "/get-current-user";
  updateUserDetailRoute = "/update-user";
  changeLogoRoute = "/change-logo";

  async CreateAccount(formData) {
    const formDataObject = Object.fromEntries(formData.entries());

    const { username, email, password, fermName, logo } = formDataObject;

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
}

const authservice = new AuthService();

export default authservice;
