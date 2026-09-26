import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../../packages/validation/auth.schema";
import { useLogin, useGoogleLogin } from "../hooks/useAuth";

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    mutate: login,
    isPending,
    error: apiError,
  } = useLogin({
    onSuccess: (data) => {
      console.log("Login Successful:", data);
      navigation?.replace("Home");
    },
    onError: (err) => {
      console.log("Login Error:", err);
    },
  });

  const {
    mutate: googleLogin,
    isPending: isGooglePending,
    error: googleError,
  } = useGoogleLogin({
    onSuccess: (data) => {
      console.log("Google Login Successful:", data);
      navigation?.replace("Home");
    },
    onError: (err) => {
      console.log("Google Login Error:", err);
    },
  });

  const onGoogleSignIn = () => {
    console.log("Google Sign-In pressed");
    // Place Google ID token authentication here when Google SDK is linked
  };

  const onSubmit = (data) => {
    login(data);
  };

  const displayError = apiError?.message || googleError?.message;

  return (
    <LinearGradient
      colors={["#1C1635", "#4A148C", "#6A1B9A"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header / Logo */}
            <View style={styles.header}>
              <View style={styles.logoBox}>
                <Image
                  source={require("../../assets/incubator.png")}
                  style={styles.logoIcon}
                />
              </View>

              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>
                Sign in to control your smart incubators
              </Text>
            </View>

            {/* Form Card */}
            <View style={styles.card}>
              {/* Stable Error Banner Container (Prevents Layout Shifts / Screen Flickering) */}
              {displayError ? (
                <View style={styles.apiErrorBox}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={18}
                    color="#FF6B6B"
                  />
                  <Text style={styles.apiErrorText}>{displayError}</Text>
                </View>
              ) : null}

              {/* Email Address Input */}
              <View style={styles.inputWrapper}>
                <View
                  style={[
                    styles.inputContainer,
                    errors.email && styles.inputErrorBorder,
                  ]}
                >
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#A796C4"
                    style={styles.inputIcon}
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        placeholderTextColor="#8E7BAE"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                      />
                    )}
                    name="email"
                  />
                </View>
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
              </View>

              {/* Password Input */}
              <View style={styles.inputWrapper}>
                <View
                  style={[
                    styles.inputContainer,
                    errors.password && styles.inputErrorBorder,
                  ]}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#A796C4"
                    style={styles.inputIcon}
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#8E7BAE"
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                      />
                    )}
                    name="password"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color="#A796C4"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.errorText}>
                    {errors.password.message}
                  </Text>
                )}
              </View>

              {/* Forgot Password */}
              <TouchableOpacity
                style={styles.forgotPasswordButton}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Sign In Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                disabled={isPending}
                onPress={handleSubmit(onSubmit)}
                style={styles.signInButtonContainer}
              >
                <LinearGradient
                  colors={["#FF2A85", "#D63384"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.signInButton}
                >
                  {isPending ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={styles.signInButtonText}>Sign In</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* ── OR Divider ── */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* ── Google Sign-In Button with Official Google Icon ── */}
              <TouchableOpacity
                style={styles.googleButton}
                activeOpacity={0.85}
                disabled={isGooglePending}
                onPress={onGoogleSignIn}
              >
                {isGooglePending ? (
                  <ActivityIndicator color="#5F6368" size="small" />
                ) : (
                  <>
                    <Ionicons
                      name="logo-google"
                      size={20}
                      color="#EA4335"
                      style={styles.googleIcon}
                    />
                    <Text style={styles.googleButtonText}>
                      Sign in with Google
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
              <View style={styles.signupRow}>
                <Text style={styles.dontHaveAccountText}>
                  Don't have an account?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation?.navigate("SignUp")}
                  activeOpacity={0.7}
                >
                  <Text style={styles.createOneText}>Create one</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.footerText}>
                Trusted by 10,000+ farmers worldwide
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 20,
    justifyContent: "center",
  },

  /* Header */
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoBox: {
    width: 86,
    height: 86,
    borderRadius: 22,
    backgroundColor: "#D63384",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#D63384",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
  },
  logoIcon: {
    width: 60,
    height: 60,
    tintColor: "#FFFFFF",
    resizeMode: "contain",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  subtitle: {
    color: "#D1C4E9",
    fontSize: 14,
    textAlign: "center",
  },

  /* Card */
  card: {
    backgroundColor: "rgba(42, 22, 71, 0.8)",
    borderRadius: 24,
    padding: 20,
    paddingTop: 28,
    borderWidth: 1,
    borderColor: "rgba(179, 157, 219, 0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  },

  apiErrorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 77, 77, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 77, 77, 0.4)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    gap: 8,
  },
  apiErrorText: {
    color: "#FF6B6B",
    fontSize: 13,
    flex: 1,
  },

  inputWrapper: {
    marginBottom: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(28, 15, 48, 0.85)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(179, 157, 219, 0.2)",
    paddingHorizontal: 14,
    height: 54,
  },
  inputErrorBorder: {
    borderColor: "#FF4D4D",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    height: "100%",
  },
  eyeButton: {
    padding: 6,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },

  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 18,
    marginTop: 2,
  },
  forgotPasswordText: {
    color: "#FF2A85",
    fontSize: 13,
    fontWeight: "600",
  },

  /* Sign In Button */
  signInButtonContainer: {
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#FF2A85",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  signInButton: {
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  signInButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  /* OR Divider */
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(179,157,219,0.2)",
  },
  dividerText: {
    color: "#8E7BAE",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
  },

  /* Google Button */
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: "#3C4043",
    fontSize: 15,
    fontWeight: "600",
  },

  /* Bottom */
  bottomSection: {
    alignItems: "center",
    marginTop: 24,
  },
  signupRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dontHaveAccountText: {
    color: "#D1C4E9",
    fontSize: 14,
  },
  createOneText: {
    color: "#FF2A85",
    fontSize: 14,
    fontWeight: "700",
  },
  footerText: {
    color: "#B39DDB",
    fontSize: 12,
  },
});
