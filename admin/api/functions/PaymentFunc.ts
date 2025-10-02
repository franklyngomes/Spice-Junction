import { Cookies } from "react-cookie";
import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endPoints/endPoints";
import axios from "axios";

export const RestaurantPayments = async (id: string) => {
  const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.get(endPoints.payments.restaurant_payments+id,{
      "headers" : {
        "Authorization": `Bearer ${token}`
      }
    });
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const AllPayments = async () => {
  const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.get(endPoints.payments.all_payments,{
      "headers" : {
        "Authorization": `Bearer ${token}`
      }
    });
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}