import { useMutation} from "@tanstack/react-query"
import {VerifyEmail,ForgotPassword, SigninFunc, AdminSignupFunc, RestaurantSignupFunc, ResetPassword } from "../functions/AuthFunc"
import { Cookies } from "react-cookie";

export const AdminSignupQuery = () => {
  return useMutation({
    mutationFn:AdminSignupFunc,
    onSuccess: () => {},
    onError: (err) => {
      return err;
    },
  });
};
export const RestaurantSignupQuery = () => {
  return useMutation({
    mutationFn:RestaurantSignupFunc,
    onSuccess: () => {},
    onError: (err) => {
      return err;
    },
  });
};
export const SigninQuery = () => {
  const cookie = new Cookies();
  return useMutation({
    mutationFn: SigninFunc,
    onSuccess: (res) => {
      if (res.status === true) {
        cookie.set("token", res.token, { path: "/", secure: true });
      }
    },
    onError: (err) => {
      return err;
    },
  });
};
export const VerifyEmailQuery = () => {
   return useMutation({
    mutationFn: (token : string) => VerifyEmail(token),
    onSuccess: () => {
    }
  })
}
export const ForgotPasswordQuery = () => {
  return useMutation({
    mutationFn:ForgotPassword,
    onSuccess: () => {},
    onError: (err) => {
      return err;
    },
  });
}
export const RestPasswordQuery = () => {
 return useMutation({
    mutationFn:ResetPassword,
    onSuccess: () => {},
    onError: (err) => {
      return err;
    },
  });
}