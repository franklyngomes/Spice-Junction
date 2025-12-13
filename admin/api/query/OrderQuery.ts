import { useMutation, useQuery} from "@tanstack/react-query"
import { queryClient } from "../../app/(admin)/provider"
import { AllOrders, OrderDetails, RestaurantOrders, UpdateOrder } from "../functions/OrderFunc"

type payload = {
  status?: string
}
export const RestaurantOrderQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["RESTAURANT_ORDERS", id],
    queryFn:() => RestaurantOrders(id),
    enabled
  })
}
export const AllOrdersQuery = () => {
  return useQuery({
    queryKey: ["ORDER_LIST"],
    queryFn:() => AllOrders(),
  })
}
export const OrderDetailsQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["ORDER_DETAILS", id],
    queryFn:() => OrderDetails(id),
    enabled
  })
}
export const UpdateOrderQuery = () => {
  return useMutation({
    mutationFn:({editId, payload} : {editId:string, payload : payload}) => UpdateOrder(editId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["ORDER_LIST"]})
      queryClient.invalidateQueries({queryKey:["RESTAURANT_ORDERS"]})
      queryClient.invalidateQueries({queryKey:["ORDER_DETAILS"]})
    },
    onError: (err) => {
      return err;
    },
  });
};