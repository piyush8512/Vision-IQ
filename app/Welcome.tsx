import { StyleSheet, View } from "react-native";
import WelcomeCard from "../components/WelcomeCard";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <WelcomeCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "#fff",
  },
});
