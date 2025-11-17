import type {
  LoginCredentials,
  RegisterCredentials,
} from "@/components/const/types";
import { api } from "../axios";
import { BACKENDURL } from "@/components/const/const";

export const login = async (data: LoginCredentials) => {
  const response = await api.post(`${BACKENDURL}/auth/login`, data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post(`${BACKENDURL}/auth/logout`);
  return response.data;
};

export const register = async (data: RegisterCredentials) => {
  const response = await api.post(`${BACKENDURL}/auth/register`, data);
  return response.data;
};
