import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../api/useAxios"

export const useSignIn = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const signIn = await axiosInstance.post("/login", body)

      return signIn
    },
    onSuccess,
  })
}
