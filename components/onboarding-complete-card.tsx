import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function OnboardingCompleteCard() {
  return (
    <View style={styles.card}>
      {/* Back */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={22} color="#fff" />
      </TouchableOpacity>

      {/* Icon */}
      <View style={styles.iconWrapper}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={36} color="#FF6A00" />
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        {[1, 2, 3, 4, 5].map((_, i) => (
          <View key={i} style={styles.progressItem} />
        ))}
      </View>

      {/* Title */}
      <Text style={styles.title}>Welcome to Eye Hero!</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Your personalized eye care journey starts now.
        Let’s keep your vision healthy together.
      </Text>

      {/* Features */}
      <View style={styles.featureBox}>
        {[
          "Daily eye care reminders & exercises",
          "Track your vision health progress",
          "Personalized tips & recommendations",
          "Connect with eye care professionals",
        ].map((item) => (
          <View key={item} style={styles.featureRow}>
            <View style={styles.bullet} />
            <Text style={styles.featureText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* CTA */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/onboarding-intro")}
      >
        <Text style={styles.buttonText}>Get Started ✨</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        You’re all set! Let’s begin your eye care journey.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 0,
  },

  iconWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  progressItem: {
    width: 30,
    height: 3,
    backgroundColor: "#fff",
    opacity: 0.8,
    marginHorizontal: 4,
    borderRadius: 2,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#FFE6D5",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },

  featureBox: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
    marginTop: 6,
    marginRight: 10,
  },
  featureText: {
    color: "#fff",
    fontSize: 13,
    flex: 1,
  },

  button: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#FF6A00",
    fontSize: 16,
    fontWeight: "600",
  },

  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#FFE6D5",
  },
});
