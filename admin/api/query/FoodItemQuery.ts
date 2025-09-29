import { useMutation, useQuery} from "@tanstack/react-query"
import {CreateFoodItem, FoodItemDetails, UpdateFoodItem, DeleteFoodItem, RestaurantFoodItem} from "../functions/FoodItemFunc"
import { queryClient } from "../../app/provider"
import { FoodItemData } from "../../types/types"

export const RestaurantFoodItemQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["RESTAURANT_FOOD_ITEM", id],
    queryFn:() => RestaurantFoodItem(id),
    enabled
  })
}
export const CreateFoodItemQuery = () => {
  return useMutation({
    mutationFn:CreateFoodItem,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["RESTAURANT_FOOD_ITEM"]})
    },
    onError: (err) => {
      return err;
    },
  });
};
export const FoodItemDetailsQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["FOOD_ITEM_DETAILS", id],
    queryFn:() => FoodItemDetails(id),
    enabled
  })
}
export const UpdateFoodItemQuery = () => {
  return useMutation({
    mutationFn:({editId, payload} : {editId:string, payload: FoodItemData}) => UpdateFoodItem(editId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["RESTAURANT_FOOD_ITEM"]})
      queryClient.invalidateQueries({queryKey:["FOOD_ITEM_DETAILS"]})
    },
    onError: (err) => {
      return err;
    },
  });
};
export const DeleteFoodItemQuery = () => {
  return useMutation({
    mutationFn:(id: string) => DeleteFoodItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["RESTAURANT_FOOD_ITEM"]})
    },
    onError: (err) => {
      return err;
    },
  });
};