import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endPoints/endPoints";
import { ForgotPasswordData, ResetPasswordData,SigninData, SignupData, VerifyEmailResponse } from "../../types/types";
import axios from "axios";

export const AdminSignupFunc = async (Data: SignupData) => {
  try {
    const response = await axiosInstance.post(endPoints.auth.adminsignup, Data);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const RestaurantSignupFunc = async (Data: SignupData) => {
  try {
    const response = await axiosInstance.post(endPoints.auth.restaurantsignup, Data);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const VerifyEmail = async (token: string): Promise<VerifyEmailResponse> => {
  try {
    const response = await axiosInstance.get(endPoints.auth.verifyEmail,
      {
        params: { token },
      })
    return response
  } catch (error) {
    throw error
  }
}
export const SigninFunc = async (Data: SigninData) => {
  try {
    const response = await axiosInstance.post(endPoints.auth.signin, Data);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}

export const ForgotPassword = async (payload: ForgotPasswordData) => {
  try {
    const response = await axiosInstance.post(endPoints.auth.forgot_password, payload);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const ResetPassword = async (payload: ResetPasswordData) => {
  try {
    const response = await axiosInstance.post(endPoints.auth.reset_password, payload);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}