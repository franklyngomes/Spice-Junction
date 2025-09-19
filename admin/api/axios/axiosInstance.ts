import axios from 'axios'

const baseURL = "https://spice-junction-server.onrender.com"

export const axiosInstance = axios.create({
  baseURL
})

export const reportApi = axios.create({
  baseURL: "https://medisync-backend-ybge.onrender.com/report"
})