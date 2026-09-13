export { default as axiosClient, configureApi } from "./axiosClient";
export { queryClient } from "./queryClient";

// Auth
export {
  login,
  register,
  logout,
  getCurrentUser,
  forgotPassword,
} from "./endpoints/auth.api";
export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./endpoints/users.api";

// React-Query hooks
export {
  useLogin,
  useSignUp,
  useCurrentUser,
  useLogout,
  AUTH_KEYS,
} from "./mutations/auth.mutations";
export { useUsers, useUser } from "./queries/users.queries";
