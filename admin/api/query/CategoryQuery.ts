import { useMutation, useQuery} from "@tanstack/react-query"
import { queryClient } from "../../app/(admin)/provider"
import { CategoryData } from "../../types/types"
import { AllCategory, CategoryDetails, CreateCategory, DeleteCategory, UpdateCategory } from "../functions/CategoryFunc"

export const AllCategoryQuery = () => {
  return useQuery({
    queryKey: ["CATEGORY_LIST"],
    queryFn:() => AllCategory(),
  })
}
export const CreateCategoryQuery = () => {
  return useMutation({
    mutationFn: CreateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["CATEGORY_LIST"]})
    },
    onError: (err) => {
      return err;
    },
  });
};
export const CategoryDetailsQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["CATEGORY_DETAILS", id],
    queryFn:() => CategoryDetails(id),
    enabled
  })
}
export const UpdateCategoryQuery = () => {
  return useMutation({
    mutationFn:({editId, payload} : {editId:string, payload: CategoryData}) => UpdateCategory(editId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["CATEGORY_LIST"]})
      queryClient.invalidateQueries({queryKey:["CATEGORY_DETAILS"]})
    },
    onError: (err) => {
      return err;
    },
  });
};
export const DeleteCategoryQuery = () => {
  return useMutation({
    mutationFn:(id: string) => DeleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["CATEGORY_LIST"]})
    },
    onError: (err) => {
      return err;
    },
  });
};