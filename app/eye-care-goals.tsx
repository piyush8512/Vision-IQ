import { View, StyleSheet } from "react-native";
import EyeCareGoalsCard from "../components/eye-care-goals-card";

export default function EyeCareGoalsScreen() {
  return (
    <View style={styles.container}>
      <EyeCareGoalsCard />
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
