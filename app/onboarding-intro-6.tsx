import { View, StyleSheet } from "react-native";
import OnboardingIntro6Card from "../components/onboarding-intro-6-card";

export default function OnboardingIntro6Screen() {
  return (
    <View style={styles.container}>
      <OnboardingIntro6Card />
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
