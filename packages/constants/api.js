export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    FORGOT_PASSWORD: "/auth/forgot-password",
    REFRESH: "/auth/refresh",
  },
  USERS: {
    LIST: "/users",
    DETAILS: (id) => `/users/${id}`,
  },
  INCUBATORS: {
    LIST: "/incubators",
    DETAILS: (id) => `/incubators/${id}`,
    TELEMETRY: (id) => `/incubators/${id}/telemetry`,
    UPDATE_SETTINGS: (id) => `/incubators/${id}/settings`,
  },
};
