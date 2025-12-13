import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "../../app/(admin)/provider"
import { AllBlog, BlogDetails, CreateBlog, DeleteBlog, UpdateBlog } from "../functions/BlogFunc"

export const AllBlogQuery = () => {
  return useQuery({
    queryKey: ["All_BLOGS"],
    queryFn: () => AllBlog(),
  })
}
export const CreateBlogQuery = () => {
  return useMutation({
    mutationFn: CreateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["All_BLOGS"] })
      queryClient.invalidateQueries({ queryKey: ["BLOG_DETAILS"] })
    },
    onError: (err) => {
      return err;
    },
  });
};
export const BlogDetailsQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["BLOG_DETAILS", id],
    queryFn: () => BlogDetails(id),
    enabled
  })
}
export const UpdateBlogQuery = () => {
  return useMutation({
    mutationFn: ({ editId, formdata }: { editId: string, formdata: FormData }) => UpdateBlog(editId, formdata),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["All_BLOGS"] })
      queryClient.invalidateQueries({ queryKey: ["BLOG_DETAILS"] })
    },
    onError: (err) => {
      return err;
    },
  });
};
export const DeleteBlogQuery = () => {
  return useMutation({
    mutationFn: (id: string) => DeleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["All_BLOGS"] })
    },
    onError: (err) => {
      return err;
    },
  });
};