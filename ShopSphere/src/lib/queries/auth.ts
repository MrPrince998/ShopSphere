import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout, register } from "../api/auth";
import type {
  LoginCredentials,
  RegisterCredentials,
} from "@/components/const/types";

export const Login = (credientials: LoginCredentials) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => login(credientials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export const Register = (credientials: RegisterCredentials) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => register(credientials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export const Logout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["currentUser"] });
    },
  });
};
