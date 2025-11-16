import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUserById, getUsers, updateUser } from "../api/users";

const queryClient = useQueryClient();

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
  });
};

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
    staleTime: 1000 * 60,
  });
};

export const useUpdateUser = (id: string, data: any) => {
  return useMutation({
    mutationFn: () => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", id] });
    },
  });
};

export const useDeleteUser = (id: string) => {
  return useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
