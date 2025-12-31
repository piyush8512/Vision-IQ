import { View, StyleSheet } from "react-native";
import SignupCard from "../components/signup-card";

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <SignupCard />
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
