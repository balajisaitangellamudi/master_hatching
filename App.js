import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import { queryClient } from "./packages/api/queryClient";
import { store } from "./packages/store/store";

import StartScreen from "./apps/mobile/src/screens/StartScreen";
import LoginScreen from "./apps/mobile/src/screens/LoginScreen";
import SignUpScreen from "./apps/mobile/src/screens/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  console.log("hatch master is running ------------>");
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar style="light" />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Start"
              screenOptions={{
                headerShown: false,
                animation: "fade_from_bottom",
              }}
            >
              <Stack.Screen name="Start" component={StartScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
}
