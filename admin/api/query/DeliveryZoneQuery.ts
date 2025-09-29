import { useMutation, useQuery} from "@tanstack/react-query"
import { queryClient } from "../../app/provider"
import { AllZone, CreateZone, DeleteZone, ZoneDetails } from "../functions/DeliveryZoneFunc";


export const AllZoneQuery = () => {
  return useQuery({
    queryKey: ["ZONE_LIST"],
    queryFn:() => AllZone(),
  })
}
export const CreateZoneQuery = () => {
  return useMutation({
    mutationFn: CreateZone,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["ZONE_LIST"]})
    },
    onError: (err) => {
      return err;
    },
  });
};
export const ZoneDetailsQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["ZONE_DETAILS", id],
    queryFn:() => ZoneDetails(id),
    enabled
  })
}
export const DeleteZoneQuery = () => {
  return useMutation({
    mutationFn:(id: string) => DeleteZone(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["ZONE_LIST"]})
    },
    onError: (err) => {
      return err;
    },
  });
};