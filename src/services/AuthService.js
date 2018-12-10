import Api from "./Api";

export default {
  getServerToken(googleToken) {
    return Api().post("/auth/google", { token: googleToken });
  },
};
