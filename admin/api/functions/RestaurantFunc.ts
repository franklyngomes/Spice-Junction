import { Cookies } from "react-cookie";
import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endPoints/endPoints";
import axios from "axios";
import { RequestData, RestaurantDetailsResponse, RestaurantResponse, RestaurantUpdateData } from "../../types/types";

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
export const AllRestaurant = async () :Promise<RestaurantResponse> => {
  try {
    const response = await axiosInstance.get(endPoints.restaurant.all_restaurant);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const AllRequest = async () : Promise<RestaurantResponse> => {
    const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.get(endPoints.request.all_request, {
      "headers" : {
        "Authorization": `Bearer ${token}`,
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
export const RespondRequest = async (id : string, payload : RequestData) => {
    const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.patch(endPoints.request.respond_request+id, payload, {
      "headers" : {
        "Authorization": `Bearer ${token}`,
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
export const RestaurantDetails = async (id: string):Promise<RestaurantDetailsResponse> => {
  try {
    const response = await axiosInstance.get(endPoints.restaurant.restaurant_details+id);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const CreateRestaurant = async (payload: FormData) => {
  const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.post(endPoints.restaurant.create_restaurant, payload, {
      "headers" : {
        "Authorization": `Bearer ${token}`,
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
export const UpdateRestaurant = async (id : string, payload : RestaurantUpdateData) => {
  const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.patch(endPoints.restaurant.update_restaurant+id, payload, {
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
export const DeleteRestaurant = async (id : string) => {
  const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.delete(endPoints.restaurant.delete_restaurant+id, {
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