import axios from "axios";
import { apiHost } from "../config";

export default (token = null) => {
  return axios.create({
    baseURL: `${apiHost}`,
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
};
