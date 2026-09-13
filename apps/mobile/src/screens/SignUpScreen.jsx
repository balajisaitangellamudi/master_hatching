import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../../../packages/validation/auth.schema";
import { useSignUp } from "../hooks/useAuth";

const SignUpScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const {
    mutate: register,
    isPending,
    error: apiError,
  } = useSignUp({
    onSuccess: (data) => {
      console.log("Sign Up Successful:", data);
      // Navigate to dashboard or login
    },
    onError: (err) => {
      console.log("Sign Up Error:", err);
    },
  });

  const onSubmit = (data) => {
    register(data);
  };

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
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Join the future of smart incubation.
              </Text>
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              {/* API Error Message */}
              {apiError && (
                <View style={styles.apiErrorBox}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={18}
                    color="#FF6B6B"
                  />
                  <Text style={styles.apiErrorText}>
                    {apiError?.message || "Failed to create account"}
                  </Text>
                </View>
              )}

              {/* First Name */}
              <View style={styles.fieldWrapper}>
                <Text style={styles.label}>First Name</Text>
                <View
                  style={[
                    styles.inputContainer,
                    errors.firstName && styles.inputErrorBorder,
                  ]}
                >
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#A796C4"
                    style={styles.inputIcon}
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="John"
                        placeholderTextColor="#8E7BAE"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                      />
                    )}
                    name="firstName"
                  />
                </View>
                {errors.firstName && (
                  <Text style={styles.errorText}>
                    {errors.firstName.message}
                  </Text>
                )}
              </View>

              {/* Last Name */}
              <View style={styles.fieldWrapper}>
                <Text style={styles.label}>Last Name</Text>
                <View
                  style={[
                    styles.inputContainer,
                    errors.lastName && styles.inputErrorBorder,
                  ]}
                >
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#A796C4"
                    style={styles.inputIcon}
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Doe"
                        placeholderTextColor="#8E7BAE"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                      />
                    )}
                    name="lastName"
                  />
                </View>
                {errors.lastName && (
                  <Text style={styles.errorText}>
                    {errors.lastName.message}
                  </Text>
                )}
              </View>

              {/* Username */}
              <View style={styles.fieldWrapper}>
                <Text style={styles.label}>Username</Text>
                <View
                  style={[
                    styles.inputContainer,
                    errors.username && styles.inputErrorBorder,
                  ]}
                >
                  <Feather
                    name="at-sign"
                    size={20}
                    color="#A796C4"
                    style={styles.inputIcon}
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="johndoe"
                        placeholderTextColor="#8E7BAE"
                        autoCapitalize="none"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                      />
                    )}
                    name="username"
                  />
                </View>
                {errors.username && (
                  <Text style={styles.errorText}>
                    {errors.username.message}
                  </Text>
                )}
              </View>

              {/* Email Address */}
              <View style={styles.fieldWrapper}>
                <Text style={styles.label}>Email Address</Text>
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
                        placeholder="john@example.com"
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

              {/* Password */}
              <View style={styles.fieldWrapper}>
                <Text style={styles.label}>Password</Text>
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
                        placeholder="Create a password"
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

              {/* Submit Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                disabled={isPending}
                onPress={handleSubmit(onSubmit)}
                style={styles.submitButtonContainer}
              >
                <LinearGradient
                  colors={["#FF2A85", "#D63384"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.submitButton}
                >
                  {isPending ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={styles.submitButtonText}>
                      Join HatchMaster
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Footer / Already have an account */}
            <View style={styles.footerRow}>
              <Text style={styles.alreadyAccountText}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => navigation?.navigate("Login")}
                activeOpacity={0.7}
              >
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignUpScreen;

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
    paddingTop: 10,
    paddingBottom: 24,
    justifyContent: "center",
  },

  /* Header */
  header: {
    alignItems: "center",
    marginBottom: 26,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#D1C4E9",
    fontSize: 14,
    textAlign: "center",
  },

  /* Form */
  formContainer: {
    width: "100%",
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
    marginBottom: 14,
    gap: 8,
  },
  apiErrorText: {
    color: "#FF6B6B",
    fontSize: 13,
    flex: 1,
  },
  fieldWrapper: {
    marginBottom: 16,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(38, 20, 64, 0.75)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(179, 157, 219, 0.2)",
    paddingHorizontal: 14,
    height: 52,
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

  /* Submit Button */
  submitButtonContainer: {
    borderRadius: 14,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 24,
    shadowColor: "#FF2A85",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  submitButton: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  /* Footer */
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  alreadyAccountText: {
    color: "#D1C4E9",
    fontSize: 14,
  },
  signInLink: {
    color: "#FF2A85",
    fontSize: 14,
    fontWeight: "700",
  },
});
