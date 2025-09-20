import { useQuery} from "@tanstack/react-query"
import { RestaurantByOwner } from "../functions/RestaurantFunc"

export const RestaurantByOwnerQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["RESTAURANT", id],
    queryFn:() => RestaurantByOwner(id),
    enabled
  })
}