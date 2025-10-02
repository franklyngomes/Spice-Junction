import {useQuery} from "@tanstack/react-query"
import { AllPayments, RestaurantPayments } from "../functions/PaymentFunc"

export const RestaurantPaymentQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["RESTAURANT_PAYMENTS", id],
    queryFn:() => RestaurantPayments(id),
    enabled
  })
}
export const AllPaymentQuery = () => {
  return useQuery({
    queryKey: ["ALL_PAYMENTS"],
    queryFn:() => AllPayments(),
  })
}