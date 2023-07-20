import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../api/useAxios"

export const useSignUp = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const signUp = await axiosInstance.post("/user", body)

      return signUp
    },
    onSuccess,
  })
}
