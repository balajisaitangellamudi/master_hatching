import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import incubator from "../assets/incubator.png";

const StartScreen = () => {
  return (
    <LinearGradient
      colors={["#1C1635", "#4A148C", "#6A1B9A"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      {/* <StatusBar barStyle="light-content" /> */}

      {/* Content */}
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoBox}>
          {/* <View style={styles.egg} /> */}

          <Image
            source={require("../assets/incubator.png")}
            style={styles.egg_img}
            // alt="incubator_image"
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
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryText}>Sign In →</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Trusted by 1+ farmers worldwide</Text>
    </LinearGradient>
  );
};

export default StartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /* Logo */
  logoBox: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: "#D63384",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  egg_img: {
    width: 85,
    height: 85,
    tintColor: "#fff",
    resizeMode: "contain",
  },
  /* Text */
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 14,
  },
  subtitle: {
    color: "#D1C4E9",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 40,
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
    marginBottom: 16,
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
  },
  secondaryText: {
    color: "#EDE7F6",
    fontSize: 16,
  },

  /* Footer */
  footer: {
    textAlign: "center",
    color: "#B39DDB",
    fontSize: 12,
    paddingBottom: 20,
  },
});
