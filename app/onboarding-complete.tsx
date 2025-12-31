import { View, StyleSheet } from "react-native";
import OnboardingCompleteCard from "../components/onboarding-complete-card";

export default function OnboardingCompleteScreen() {
  return (
    <View style={styles.container}>
      <OnboardingCompleteCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6A00",
    justifyContent: "center",
    padding: 20,
  },
});
