import { BACKENDURL } from "@/components/const/const";
import { api } from "../axios";

export const getUsers = async () => {
  const response = await api.get(`${BACKENDURL}/users`);
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await api.get(`${BACKENDURL}/users/${id}`);
  return response.data;
};

export const updateUser = async (id: string, data: any) => {
  const response = await api.put(`${BACKENDURL}/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`${BACKENDURL}/users/${id}`);
  return response.data;
};
