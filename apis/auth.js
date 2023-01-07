import axios from "axios";
import { base_api_url } from "./constants/urls";

export const signupUser = async (userInfo) => {
    let response = axios({
      method: "post",
      baseURL: base_api_url,
      url: `/account/auth/signup/`,
      data: userInfo,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
};

export const loginUser = async (userInfo) => {
    let response = axios({
      method: "post",
      baseURL: base_api_url,
      url: `/account/auth/login/`,
      data: userInfo,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
};
