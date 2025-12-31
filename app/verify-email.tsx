import { View, StyleSheet } from "react-native";
import VerifyEmailCard from "../components/verify-email-card";

export default function VerifyEmailScreen() {
  return (
    <View style={styles.container}>
      <VerifyEmailCard />
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
