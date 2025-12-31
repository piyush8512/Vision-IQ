import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function OnboardingIntro3Card() {
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
        {[1, 2].map((_, i) => (
          <View key={i} style={styles.progressDot} />
        ))}
        <View style={[styles.progressDot, styles.active]} />
        {[1, 2, 3].map((_, i) => (
          <View key={i} style={styles.progressDot} />
        ))}
      </View>

      {/* Icon */}
      <View style={styles.iconWrapper}>
        <View style={styles.iconCircle}>
          <Ionicons name="pulse-outline" size={40} color="#FF6A00" />
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        Track. Learn. Stay Prepared.
      </Text>

      {/* Bullet Points */}
      <View style={styles.bulletList}>
        {[
          "Know symptom patterns & trends",
          "Never miss appointments",
          "Learn daily eye-care tips",
        ].map((item) => (
          <View key={item} style={styles.bulletRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* CTA */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/onboarding-intro-4")}
      >
        <Text style={styles.buttonText}>Next →</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>3 of 6</Text>
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
    marginBottom: 16,
    color: "#111",
  },

  bulletList: {
    marginBottom: 32,
  },
  bulletRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    marginRight: 6,
    color: "#6B7280",
  },
  bulletText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
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
