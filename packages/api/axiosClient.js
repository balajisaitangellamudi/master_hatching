import axios from "axios";
import { tokenStorage } from "../storage/tokenStorage";

let _baseURL = "https://api.hatchmaster.com/v1";

/**
 * Configure the shared API client.
 * Call once at app startup (e.g. in App.js) before any requests.
 *
 * @param {{ baseURL?: string }} options
 */
export function configureApi({ baseURL } = {}) {
  if (baseURL) {
    _baseURL = baseURL;
    axiosClient.defaults.baseURL = baseURL;
  }
}

const axiosClient = axios.create({
  baseURL: _baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Attach bearer token to every request
axiosClient.interceptors.request.use(
  async (config) => {
    const token = await tokenStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Handle 401 + normalise error shape
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await tokenStorage.removeToken();
    }

    const formattedError = {
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "An unexpected error occurred. Please try again.",
      status: error.response?.status,
      data: error.response?.data,
    };

    return Promise.reject(formattedError);
  },
);

export default axiosClient;
