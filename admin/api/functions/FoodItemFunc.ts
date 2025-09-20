import { Cookies } from "react-cookie";
import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endPoints/endPoints";
import axios from "axios";
import { FoodItemData, FoodItemDetailsResponse, FoodItemResponse } from "../../types/types";
// import { FoodItemData, FoodItemResponse } from "../../types/types";

export const CreateFoodItem = async (payload: FormData) => {
  const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.post(endPoints.fooditem.create_food_item, payload, {
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
export const FoodItemDetails = async (id: string) : Promise<FoodItemDetailsResponse> => {
  try {
    const response = await axiosInstance.get(endPoints.fooditem.food_item_details+id);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const RestaurantFoodItem = async (id: string) : Promise<FoodItemResponse> => {
  try {
    const response = await axiosInstance.get(endPoints.fooditem.restaurant_food_item+id);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const UpdateFoodItem = async (id : string,payload : FoodItemData) => {
  const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.patch(endPoints.fooditem.update_food_item+id, payload, {
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
export const DeleteFoodItem = async (id : string) => {
  const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.delete(endPoints.fooditem.delete_food_item+id, {
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
