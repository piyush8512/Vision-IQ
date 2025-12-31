import { View, StyleSheet } from "react-native";
import OnboardingIntro4Card from "../components/onboarding-intro-4-card";

export default function OnboardingIntro4Screen() {
  return (
    <View style={styles.container}>
      <OnboardingIntro4Card />
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
