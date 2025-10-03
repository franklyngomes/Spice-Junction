import axios from 'axios'
import { Cookies } from "react-cookie";
import { endPoints } from '../endPoints/endPoints';

const baseURL = "https://spice-junction.onrender.com"
const cookies = new Cookies()

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
})

axios.defaults.withCredentials = true;

// Add a request interceptor to attach access token
axiosInstance.interceptors.request.use((config) => {
  const token = cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use((response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh token endpoint
        const { data } = await axios.post(`${baseURL}${endPoints.auth.refresh_token}`, {}, { withCredentials: true })
        // Save new access token
         cookies.set("token", data.accessToken,{ path: "/", sameSite: "none" })

        //Retry original request with new token
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`

        return axiosInstance(originalRequest)
      } catch (error) {
        console.error("Refresh token failed!", error)
        // cookies.remove("token");
        // window.location.href = "/signin"
      }
    }
    return Promise.reject(error);
  })