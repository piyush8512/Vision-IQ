import { View, StyleSheet } from "react-native";
import OnboardingIntro5Card from "../components/onboarding-intro-5-card";

export default function OnboardingIntro5Screen() {
  return (
    <View style={styles.container}>
      <OnboardingIntro5Card />
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
