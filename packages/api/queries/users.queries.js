import { useQuery } from "@tanstack/react-query";
import { getUsers, getUserById } from "../endpoints/users.api";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}

export function useUser(id) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: Boolean(id),
  });
}
