import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endPoints/endPoints";
import { Cookies } from "react-cookie";
export const UserProfileFunc = async (id: string) => {
  try {
    const cookies = new Cookies()
    const token = cookies.get('token')
    const response = await axiosInstance.get(endPoints.userProfile+id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
      throw error
  }
}