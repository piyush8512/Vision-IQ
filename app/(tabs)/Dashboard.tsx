import { StyleSheet, Text, View } from "react-native";
import { ScreenSkeleton } from "../../components/layouts/ScreenSkeleton";

export default function Dashboard() {
  // TODO-API: FETCH_DASHBOARD_DATA
  // Request: { userId }
  // Response: { userStats { appointmentsThisMonth, symptomsLoggedThisWeek, daysUntilNextExam, healthScore }, upcomingAppointments[], recentSymptoms[], healthInsights[] }
  
  return (
    <ScreenSkeleton>
      <View style={styles.content}>
        <Text style={styles.text}>Dashboard (Blank)</Text>
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
