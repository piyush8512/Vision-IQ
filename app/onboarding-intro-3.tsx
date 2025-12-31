import { View, StyleSheet } from "react-native";
import OnboardingIntro3Card from "../components/onboarding-intro-3-card";

export default function OnboardingIntro3Screen() {
  return (
    <View style={styles.container}>
      <OnboardingIntro3Card />
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
