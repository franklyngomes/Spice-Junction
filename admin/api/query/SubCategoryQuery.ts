import { useMutation, useQuery} from "@tanstack/react-query"
import {CreateSubCategory, SubCategoryDetails, UpdateSubCategory, DeleteSubCategory, AllSubCategory} from "../functions/SubCategoryFunc"
import { queryClient } from "../../app/provider"
import { SubCategoryData } from "../../types/types"

export const AllSubCategoryQuery = () => {
  return useQuery({
    queryKey: ["SUBCATEGORY_LIST"],
    queryFn:() => AllSubCategory(),
  })
}
export const CreateSubCategoryQuery = () => {
  return useMutation({
    mutationFn:CreateSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["SUBCATEGORY_LIST"]})
    },
    onError: (err) => {
      return err;
    },
  });
};
export const SubCategoryDetailsQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["SUBCATEGORY_DETAILS", id],
    queryFn:() => SubCategoryDetails(id),
    enabled
  })
}
export const UpdateSubCategoryQuery = () => {
  return useMutation({
    mutationFn:({editId, payload} : {editId:string, payload: SubCategoryData}) => UpdateSubCategory(editId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["SUBCATEGORY_LIST"]})
      queryClient.invalidateQueries({queryKey:["SUBCATEGORY_DETAILS"]})
    },
    onError: (err) => {
      return err;
    },
  });
};
export const DeleteSubCategoryQuery = () => {
  return useMutation({
    mutationFn:(id: string) => DeleteSubCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["SUBCATEGORY_LIST"]})
    },
    onError: (err) => {
      return err;
    },
  });
};