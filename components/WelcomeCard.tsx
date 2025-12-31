import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function WelcomeCard() {
  return (
    <View style={styles.card}>
      {/* Icon */}
      <View style={styles.iconContainer}>
        <Ionicons name="eye-outline" size={40} color="#FF6A00" />
      </View>

      <Text style={styles.title}>
        Welcome to Eye Hero Global
      </Text>

      <Text style={styles.subtitle}>
        Your personal companion for better eye health and care.
      </Text>

      <TouchableOpacity
        style={styles.button}
         onPress={() => router.push("/signup")}

      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <View style={styles.loginRow}>
        <Text style={styles.loginText}>
          Already have an account?
        </Text>
        <TouchableOpacity>
          <Text style={styles.loginLink}> Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF7F0",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFE6D5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#FF6A00",
    paddingVertical: 14,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginRow: {
    flexDirection: "row",
  },
  loginText: {
    fontSize: 13,
    color: "#6B7280",
  },
  loginLink: {
    fontSize: 13,
    color: "#FF6A00",
    fontWeight: "600",
  },
});
