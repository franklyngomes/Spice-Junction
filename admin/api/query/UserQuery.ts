import { useQuery } from "@tanstack/react-query"
import { UserProfileFunc } from "../functions/UserFunc"
import { Cookies } from "react-cookie";

export const UserProfileQuery = () => {
  const cookies = new Cookies()
  const userId = cookies.get("userId")
  return useQuery({
    queryKey: ["UserProfile", userId],
    queryFn: () => UserProfileFunc(userId),
    enabled: !!userId,
  })
}