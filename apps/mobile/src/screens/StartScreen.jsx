import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const StartScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#1C1635", "#4A148C", "#6A1B9A"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Content */}
          <View style={styles.content}>
            {/* Logo */}
            <View style={styles.logoBox}>
              <Image
                source={require("../../assets/incubator.png")}
                style={styles.egg_img}
              />
            </View>

            {/* Title */}
            <Text style={styles.title}>Welcome to{"\n"}HatchMaster</Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>
              Control and monitor your smart incubators from anywhere. Real-time
              data, automation, and insights.
            </Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                activeOpacity={0.8}
                onPress={() => navigation?.navigate("Login")}
              >
                <Text style={styles.primaryText}>Sign In →</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                activeOpacity={0.8}
                onPress={() => navigation?.navigate("SignUp")}
              >
                <Text style={styles.secondaryText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>
            Trusted by 10,000+ farmers worldwide
          </Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },

  /* Logo */
  logoBox: {
    width: 90,
    height: 90,
    borderRadius: 22,
    backgroundColor: "#D63384",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
    shadowColor: "#D63384",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },

  egg_img: {
    width: 65,
    height: 65,
    tintColor: "#fff",
    resizeMode: "contain",
  },

  /* Text */
  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  subtitle: {
    color: "#D1C4E9",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 36,
    paddingHorizontal: 12,
  },

  /* Buttons */
  buttonContainer: {
    width: "100%",
  },
  primaryButton: {
    backgroundColor: "#D63384",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#D63384",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#B39DDB",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "rgba(179, 157, 219, 0.08)",
  },
  secondaryText: {
    color: "#EDE7F6",
    fontSize: 16,
    fontWeight: "500",
  },

  /* Footer */
  footer: {
    textAlign: "center",
    color: "#B39DDB",
    fontSize: 13,
    paddingTop: 8,
  },
});
