import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  login,
  register,
  logout as logoutApi,
  getCurrentUser,
} from "../endpoints/auth.api";
import {
  loginSuccess,
  logout as logoutAction,
} from "../../store/slices/authSlice";
import { tokenStorage } from "../../storage/tokenStorage";

export const AUTH_KEYS = {
  currentUser: ["auth", "currentUser"],
};

/**
 * React-Query mutation for logging in.
 * Stores the token, updates Redux auth state, and caches the user.
 */
export function useLogin(options = {}) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { onSuccess: userOnSuccess, onError: userOnError, ...restOptions } =
    options;

  return useMutation({
    mutationFn: login,
    onSuccess: async (data, variables, context) => {
      const token = data?.accessToken || data?.token;
      if (token) {
        await tokenStorage.setToken(token);
      }

      const user = data?.user || data;
      dispatch(loginSuccess(user));
      queryClient.setQueryData(AUTH_KEYS.currentUser, user);

      userOnSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      userOnError?.(error, variables, context);
    },
    ...restOptions,
  });
}

/**
 * React-Query mutation for signing up.
 * Stores the token, updates Redux auth state, and caches the user.
 */
export function useSignUp(options = {}) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { onSuccess: userOnSuccess, onError: userOnError, ...restOptions } =
    options;

  return useMutation({
    mutationFn: register,
    onSuccess: async (data, variables, context) => {
      const token = data?.accessToken || data?.token;
      if (token) {
        await tokenStorage.setToken(token);
      }

      const user = data?.user || data;
      dispatch(loginSuccess(user));
      queryClient.setQueryData(AUTH_KEYS.currentUser, user);

      userOnSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      userOnError?.(error, variables, context);
    },
    ...restOptions,
  });
}

/**
 * React-Query query for fetching the current authenticated user.
 */
export function useCurrentUser(options = {}) {
  return useQuery({
    queryKey: AUTH_KEYS.currentUser,
    queryFn: getCurrentUser,
    ...options,
  });
}

/**
 * React-Query mutation for logging out.
 * Clears token, Redux state, and all cached queries.
 */
export function useLogout(options = {}) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { onSuccess: userOnSuccess, ...restOptions } = options;

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: async (data, variables, context) => {
      await tokenStorage.removeToken();
      dispatch(logoutAction());
      queryClient.clear();

      userOnSuccess?.(data, variables, context);
    },
    ...restOptions,
  });
}
