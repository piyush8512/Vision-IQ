import { StyleSheet, Text, View } from "react-native";
import { ScreenSkeleton } from "../../components/layouts/ScreenSkeleton";

export default function Dashboard() {
  // TODO-API: FETCH_SYMPTOM_HISTORY
  // Request: { userId, dateRange: { startDate, endDate } }
  // Response: { symptomLogs[] with id, eye, symptoms[], notes, timestamp }
  
  return (
    <ScreenSkeleton>
      <View style={styles.content}>
        <Text style={styles.text}>Symptoms module (Blank)</Text>
      </View>
    </ScreenSkeleton>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "600",
  },
});
