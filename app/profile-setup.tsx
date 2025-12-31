import { View, StyleSheet } from "react-native";
import ProfileSetupCard from "../components/profile-setup-card";

export default function ProfileSetupScreen() {
  return (
    <View style={styles.container}>
      <ProfileSetupCard />
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
