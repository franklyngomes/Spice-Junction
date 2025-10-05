import { useMutation, useQuery} from "@tanstack/react-query"
import { AllRequest, AllRestaurant, CreateRestaurant, DeleteRestaurant, RespondRequest, RestaurantByOwner, RestaurantDetails, UpdateRestaurant } from "../functions/RestaurantFunc"
import { queryClient } from "../../app/(admin)/provider"
import { RequestData } from "../../types/types"
export const RestaurantByOwnerQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["RESTAURANT", id],
    queryFn:() => RestaurantByOwner(id),
    enabled
  })
}
export const AllRestaurantQuery = () => {
  return useQuery({
    queryKey: ["RESTAURANT_LIST"],
    queryFn:() => AllRestaurant(),
  })
}
export const AllRequestQuery = () => {
  return useQuery({
    queryKey: ["REQUEST_LIST"],
    queryFn:() => AllRequest(),
  })
}
export const RespondRequestQuery = () => {
  return useMutation({
    mutationFn:({editId, payload} : {editId:string, payload : RequestData}) => RespondRequest(editId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["REQUEST_LIST"]})
      queryClient.refetchQueries({queryKey:["REQUEST_LIST"]})
      queryClient.invalidateQueries({queryKey: ["RESTAURANT"]})
    },
    onError: (err) => {
      return err;
    },
  });
};
export const RestaurantDetailsQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["RESTAURANT_DETAILS", id],
    queryFn:() => RestaurantDetails(id),
    enabled
  })
}
export const CreateRestaurantQuery = () => {
  return useMutation({
    mutationFn: CreateRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["RESTAURANT"]})
      queryClient.refetchQueries({queryKey:["RESTAURANT"]})
      queryClient.invalidateQueries({queryKey:["RESTAURANT_LIST"]})
    },
    onError: (err) => {
      return err;
    },
  });
};
export const UpdateRestaurantQuery = () => {
  return useMutation({
    mutationFn:({id, formdata} : {id:string, formdata : FormData}) => UpdateRestaurant(id, formdata),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["RESTAURANT"]})
      queryClient.invalidateQueries({queryKey:["RESTAURANT_LIST"]})
      queryClient.refetchQueries({queryKey:["REQUEST_LIST"]})
    },
    onError: (err) => {
      return err;
    },
  });
};
export const DeleteRestaurantQuery = () => {
  return useMutation({
    mutationFn:(id: string) => DeleteRestaurant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["RESTAURANT"]})
      queryClient.invalidateQueries({queryKey:["RESTAURANT_LIST"]})
      queryClient.invalidateQueries({queryKey:["REQUEST_LIST"]})
    },
    onError: (err) => {
      return err;
    },
  });
};