import { ScreenSkeleton } from "@/components/layouts/ScreenSkeleton";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";




export default function Logout() {
  const router = useRouter();
  return (
    <ScreenSkeleton>
      <Text style={styles.header}>Are you sure you want to log out?</Text>


      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.cancelButton} onPress={() => router.push('/Profile')}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </ScreenSkeleton>
  );
}


const styles = StyleSheet.create({
  header: { fontSize: 18, fontWeight: "700", marginBottom: 24, textAlign: "center" },
  logoutButton: {
    backgroundColor: "#FF6A00",
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 12,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  cancelButton: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  cancelText: { color: "#6B7280", fontSize: 16, fontWeight: "600" },
});
