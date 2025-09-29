import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const axiosInstance = axios.create({
  baseURL
})

export const reportApi = axios.create({
  baseURL: "https://medisync-backend-ybge.onrender.com/report"
})