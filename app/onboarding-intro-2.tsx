import { View, StyleSheet } from "react-native";
import OnboardingIntro2Card from "../components/onboarding-intro-2-card";

export default function OnboardingIntro2Screen() {
  return (
    <View style={styles.container}>
      <OnboardingIntro2Card />
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
