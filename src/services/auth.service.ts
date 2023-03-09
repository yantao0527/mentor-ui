import axios from "axios";
import qs from 'qs'

const API_URL = "/";

class AuthService {
  login(email: string, password: string) {
    console.log("login");
    return axios
      .post("/auth/bearer/login", qs.stringify({
        grant_type: "password",
        username: email,
        password,
        scope: "scopes",
        client_id: "",
        client_secret: ""
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username:string, email: string, password: string, roles: Array<String>) {
    console.log("register");
    return axios.post("/auth/register", {
      email,
      password,
      is_active: true,
      is_superuser: false,
      is_verified: false,
      username,
      roles
    });
  }

  getMe() {
    console.log("getMe");
    return axios.get("/users/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
