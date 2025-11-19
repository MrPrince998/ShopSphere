import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout, register } from "../api/auth";
import type {
  LoginCredentials,
  RegisterCredentials,
} from "@/components/const/types";

export const Login = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export const Register = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credientials: RegisterCredentials) => register(credientials),
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
