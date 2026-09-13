import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "access_token";

export const tokenStorage = {
  async getToken() {
    if (Platform.OS === "web") {
      return globalThis.localStorage?.getItem(TOKEN_KEY) ?? null;
    }

    return AsyncStorage.getItem(TOKEN_KEY);
  },

  async setToken(token) {
    if (Platform.OS === "web") {
      globalThis.localStorage?.setItem(TOKEN_KEY, token);
      return;
    }

    await AsyncStorage.setItem(TOKEN_KEY, token);
  },

  async removeToken() {
    if (Platform.OS === "web") {
      globalThis.localStorage?.removeItem(TOKEN_KEY);
      return;
    }

    await AsyncStorage.removeItem(TOKEN_KEY);
  },
};
