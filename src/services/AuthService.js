import Api from "./Api";

export default {
  getServerToken(googleToken) {
    return Api().post("/auth/google", { token: googleToken });
  },
  signUp(user) {
    return Api().post("/users", user);
  },
  login(username, password) {
    return Api().post("/auth", { username, password });
  },
  logout() {
    return;
  },
  refres() {
    return;
  },
  me() {
    return;
  },
  payload() {
    return;
  },
};
