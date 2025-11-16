import type {
  LoginCredentials,
  RegisterCredentials,
} from "@/components/const/types";
import { api } from "../axios";

export const login = async (data: LoginCredentials) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const register = async (data: RegisterCredentials) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
