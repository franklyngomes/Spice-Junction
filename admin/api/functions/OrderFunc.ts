import { Cookies } from "react-cookie";
import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endPoints/endPoints";
import axios from "axios";

type payload = {
  status?: string
}
export const RestaurantOrders = async (id: string) => {
  const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.get(endPoints.orders.restaurant_orders+id,{
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
export const AllOrders = async () => {
  const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.get(endPoints.orders.all_orders,{
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
export const OrderDetails = async (id: string) => {
  const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.get(endPoints.orders.order_details+id,{
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
export const UpdateOrder = async (id : string, payload : payload) => {
  const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.patch(endPoints.orders.update_order+id, payload, {
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