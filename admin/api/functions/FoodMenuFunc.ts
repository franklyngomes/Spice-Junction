import { Cookies } from "react-cookie";
import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endPoints/endPoints";
import axios from "axios";
import { FoodMenuData, FoodMenuResponse } from "../../types/types";

export const CreateFoodMenu = async (payload : FoodMenuData) => {
  const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.post(endPoints.foodmenu.create_food_menu, payload, {
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
export const AllFoodMenu = async () : Promise<FoodMenuResponse> => {
  try {
    const response = await axiosInstance.get(endPoints.foodmenu.all_food_menu);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const FoodMenuDetails = async (id: string) => {
  try {
    const response = await axiosInstance.get(endPoints.foodmenu.food_menu_details+id);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const RestaurantFoodMenu = async (id: string) : Promise<FoodMenuResponse> => {
  try {
    const response = await axiosInstance.get(endPoints.foodmenu.restaurant_food_menu+id);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const UpdateFoodMenu = async (id : string,payload : FoodMenuData) => {
  const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.patch(endPoints.foodmenu.update_food_menu+id, payload, {
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
export const DeleteFoodMenu = async (id : string) => {
  const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.delete(endPoints.foodmenu.delete_food_menu+id, {
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
