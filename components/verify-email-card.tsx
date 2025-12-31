import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function VerifyEmailCard() {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressItem, styles.active]} />
        <View style={[styles.progressItem, styles.active]} />
        <View style={styles.progressItem} />
        <View style={styles.progressItem} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subtitle}>
        We sent a 6-digit code to{" "}
        <Text style={styles.email}>lakshitaju36@gmail.com</Text>
      </Text>

      {/* OTP Inputs */}
      <View style={styles.otpRow}>
        {Array.from({ length: 6 }).map((_, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>

      {/* Resend */}
      <Text style={styles.resendText}>
        Didn’t receive the code?
      </Text>
      <TouchableOpacity>
        <Text style={styles.resendLink}>Resend Code</Text>
      </TouchableOpacity>

      {/* Verify Button */}
      <TouchableOpacity style={styles.button} 
      onPress={() => router.push("/profile-setup")}>
        <Text style={styles.buttonText}>Verify & Continue</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        Enter code: 123456 to continue demo
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF7F0",
    borderRadius: 24,
    padding: 24,
  },

  header: {
    marginBottom: 16,
  },

  progressContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  progressItem: {
    flex: 1,
    height: 3,
    backgroundColor: "#E5E7EB",
    marginRight: 6,
    borderRadius: 2,
  },
  active: {
    backgroundColor: "#FF6A00",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
  },
  email: {
    color: "#111",
    fontWeight: "600",
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  otpInput: {
    width: 44,
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#fff",
  },

  resendText: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
  },
  resendLink: {
    fontSize: 13,
    color: "#FF6A00",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 24,
  },

  button: {
    backgroundColor: "#FFB37A",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#9CA3AF",
  },
});
