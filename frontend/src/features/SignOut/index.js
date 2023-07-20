import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../api/useAxios"

export const useSignOut = () => {
  return useMutation({
    mutationFn: async () => {
      return await axiosInstance.delete("/logout")
    },
  })
}
