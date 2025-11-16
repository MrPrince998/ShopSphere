import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register } from "../api/auth";
import type {
  LoginCredentials,
  RegisterCredentials,
} from "@/components/const/types";

const queryClient = useQueryClient();

export const Login = (credientials: LoginCredentials) => {
  return useMutation({
    mutationFn: () => login(credientials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export const Register = (credientials: RegisterCredentials) => {
  return useMutation({
    mutationFn: () => register(credientials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export const Logout = () => {
  return useMutation({
    mutationFn: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      return Promise.resolve();
    },
  });
};
