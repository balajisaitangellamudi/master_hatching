import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  login,
  register,
  logout as logoutApi,
  getCurrentUser,
  googleAuth,
} from "../endpoints/auth.api";
import {
  loginSuccess,
  logout as logoutAction,
} from "../../store/slices/authSlice";
import { tokenStorage } from "../../storage/tokenStorage";

export const AUTH_KEYS = {
  currentUser: ["auth", "currentUser"],
};

/** Shared post-login handler: store token + update Redux + cache user */
async function handleAuthSuccess(data, dispatch, queryClient) {
  // Backend returns { status: "success", token: "...", data: { user: { ... } } }
  const token = data?.token || data?.accessToken;
  if (token) {
    await tokenStorage.setToken(token);
  }
  const user = data?.data?.user || data?.user || data;
  dispatch(loginSuccess(user));
  queryClient.setQueryData(AUTH_KEYS.currentUser, user);
}

/**
 * React-Query mutation for logging in with email + password.
 */
export function useLogin(options = {}) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    onSuccess: userOnSuccess,
    onError: userOnError,
    ...restOptions
  } = options;

  return useMutation({
    mutationFn: login,
    onSuccess: async (data, variables, context) => {
      await handleAuthSuccess(data, dispatch, queryClient);
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
 */
export function useSignUp(options = {}) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    onSuccess: userOnSuccess,
    onError: userOnError,
    ...restOptions
  } = options;

  return useMutation({
    mutationFn: register,
    onSuccess: async (data, variables, context) => {
      await handleAuthSuccess(data, dispatch, queryClient);
      userOnSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      userOnError?.(error, variables, context);
    },
    ...restOptions,
  });
}

/**
 * React-Query mutation for Google OAuth login.
 * Pass the Google ID token received from Google Sign-In.
 */
export function useGoogleLogin(options = {}) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    onSuccess: userOnSuccess,
    onError: userOnError,
    ...restOptions
  } = options;

  return useMutation({
    mutationFn: ({ idToken }) => googleAuth(idToken),
    onSuccess: async (data, variables, context) => {
      await handleAuthSuccess(data, dispatch, queryClient);
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
 * Revokes refresh token, clears httpOnly cookie, removes local token.
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
