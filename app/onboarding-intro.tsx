import { View, StyleSheet } from "react-native";
import OnboardingIntroCard from "../components/onboarding-intro-card";

export default function OnboardingIntroScreen() {
  return (
    <View style={styles.container}>
      <OnboardingIntroCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
});
