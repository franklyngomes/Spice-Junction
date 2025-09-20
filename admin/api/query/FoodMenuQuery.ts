import { useMutation, useQuery} from "@tanstack/react-query"
import {CreateFoodMenu, AllFoodMenu, FoodMenuDetails, UpdateFoodMenu, DeleteFoodMenu, RestaurantFoodMenu} from "../functions/FoodMenuFunc"
import { queryClient } from "../../app/provider"
import { FoodMenuData } from "../../types/types"

export const AllFoodMenuQuery = () => {
  return useQuery({
    queryKey: ["FOOD_MENU"],
    queryFn: AllFoodMenu
  })
}
export const RestaurantFoodMenuQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["RESTAURANT_FOOD_MENU", id],
    queryFn:() => RestaurantFoodMenu(id),
    enabled
  })
}
export const CreateFoodMenuQuery = () => {
  return useMutation({
    mutationFn:CreateFoodMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["RESTAURANT_FOOD_MENU"]})
    },
    onError: (err) => {
      return err;
    },
  });
};
export const FoodMenuDetailsQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["FOOD_MENU_DETAILS", id],
    queryFn:() => FoodMenuDetails(id),
    enabled
  })
}
export const UpdateFoodMenuQuery = () => {
  return useMutation({
    mutationFn:({editId, payload} : {editId:string, payload: FoodMenuData}) => UpdateFoodMenu(editId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["RESTAURANT_FOOD_MENU"]})
      queryClient.invalidateQueries({queryKey:["FOOD_MENU_DETAILS"]})
    },
    onError: (err) => {
      return err;
    },
  });
};
export const DeleteFoodMenuQuery = () => {
  return useMutation({
    mutationFn:(id: string) => DeleteFoodMenu(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["RESTAURANT_FOOD_MENU"]})
    },
    onError: (err) => {
      return err;
    },
  });
};