import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endPoints/endPoints";
import axios from "axios";

export const RestaurantByOwner = async (id: string) => {
  try {
    const response = await axiosInstance.get(endPoints.restaurant.restaurant_by_owner+id);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}