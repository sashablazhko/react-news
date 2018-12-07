import Api from "./Api";

export default {
  getServerToken(googleToken) {
    return Api().post("/auth/google", { token: googleToken });
  },

  signUp(email, password) {
    return Api().post("/auth/signup", { email, password });
  },
  login(email, password) {
    return Api().post("/auth/login", { email, password });
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
