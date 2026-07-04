import { StyleSheet, Text, View } from "react-native";
import { ScreenSkeleton } from "../../components/layouts/ScreenSkeleton";

export default function DocFinder() {
  // TODO-API: SEARCH_DOCTORS
  // Request: { userId, latitude, longitude, radius, specialization, acceptsInsurance, availableNow }
  // Response: { doctors[] with id, name, specialization, clinicName, address, phone, website, rating, reviewCount, acceptedInsurances, availableSlots, latitude, longitude, distance }
  
  return (
    <ScreenSkeleton>
      <View style={styles.content}>
        <Text style={styles.text}>Doctor finder: uses Google Maps API (Blank)</Text>
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
