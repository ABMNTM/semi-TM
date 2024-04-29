import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

export const baseURL = "http://localhost:8000";
export const accessTokenKey = "access";
export const refreshTokenKey = "refresh";

const customAxios = axios.create({
  baseURL,
});

customAxios.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get(accessTokenKey);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log("request token set.");
    }
    return config;
  },
  (error) => {
    console.log("error in request error setting", error);
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    // No need to handle successful responses
    console.log("response done .");
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops
      const refreshToken = Cookies.get(refreshTokenKey);

      try {
        const refreshResponse = await axios.post(baseURL + "/token/refresh/", {
          refresh: refreshToken,
        });

        Cookies.set(accessTokenKey, refreshResponse.data.access);

        // Update authorization header with new access token
        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access_token}`;

        // Return the original request with the updated header
        return customAxios(originalRequest);
      } catch (error) {
        const refreshError = error as AxiosError;
        if (refreshError.response && refreshError.response.status === 401) {
          window.location.href = "/auth";
        } else {
          console.error("Error refreshing token:", refreshError);
        }
      }
    }

    console.log("erro in setting res.", error);
    return Promise.reject(error);
  }
);

export default customAxios;
