import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function OnboardingIntroCard() {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/signup")}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressDot, styles.active]} />
        {[1, 2, 3, 4, 5].map((_, i) => (
          <View key={i} style={styles.progressDot} />
        ))}
      </View>

      {/* Icon */}
      <View style={styles.iconWrapper}>
        <View style={styles.iconCircle}>
          <Ionicons name="shield-checkmark-outline" size={40} color="#FF6A00" />
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        Protect Your Vision. Every Day.
      </Text>

      {/* Description */}
      <Text style={styles.subtitle}>
        Eye Hero Global helps you safeguard your eye health, track symptoms,
        and stay on top of care — anywhere in the world.
      </Text>

      {/* CTA */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/onboarding-intro-2")}
      >
        <Text style={styles.buttonText}>Next →</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>1 of 6</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  skipText: {
    fontSize: 14,
    color: "#9CA3AF",
  },

  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 4,
  },
  active: {
    backgroundColor: "#FF6A00",
  },

  iconWrapper: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFF1E6",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    color: "#111",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 20,
  },

  button: {
    backgroundColor: "#FF6A00",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 12,
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
