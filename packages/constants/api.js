export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    REFRESH_TOKEN: "/auth/refresh-token",
    GOOGLE: "/auth/google",
    FORGOT_PASSWORD: "/auth/forgot-password",
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
