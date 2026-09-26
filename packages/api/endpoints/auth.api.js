import axiosClient from "../axiosClient";
import { API_ENDPOINTS } from "../../constants/api";

export async function login(credentials) {
  const response = await axiosClient.post(
    API_ENDPOINTS.AUTH.LOGIN,
    credentials,
  );

  console.log("credentials", credentials);
  console.log("response ", response);
  return response.data;
}

export async function register(userData) {
  const response = await axiosClient.post(
    API_ENDPOINTS.AUTH.REGISTER,
    userData,
  );

  return response.data;
}

export async function logout() {
  const response = await axiosClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  return response.data;
}

export async function getCurrentUser() {
  const response = await axiosClient.get(API_ENDPOINTS.AUTH.ME);
  return response.data;
}

export async function forgotPassword(email) {
  const response = await axiosClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
    email,
  });
  return response.data;
}

export async function refreshToken() {
  const response = await axiosClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN);
  return response.data;
}

/**
 * Authenticate using a Google OAuth ID token.
 * @param {string} idToken  - The ID token received from Google Sign-In.
 */
export async function googleAuth(idToken) {
  const response = await axiosClient.post(API_ENDPOINTS.AUTH.GOOGLE, {
    idToken,
  });
  return response.data;
}
