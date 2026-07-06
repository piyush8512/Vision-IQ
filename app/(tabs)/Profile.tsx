import { ScreenSkeleton } from "@/components/layouts/ScreenSkeleton";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={{ marginRight: 12 }}>
        <Ionicons name={icon as any} size={16} color="#F97316" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function OptionRow({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <TouchableOpacity style={styles.optionRow}>
      <View style={styles.optionLeft}>
        {icon}
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.optionTitle}>{title}</Text>
          <Text style={styles.optionSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
    </TouchableOpacity>
  );
}

export default function Profile() {
  // TODO-API: FETCH_PROFILE_REQUEST
  // Request: { userId }
  // Response: { name, email, phone, dateOfBirth, memberSince, profileImageUrl }
  
  return (
    <ScreenSkeleton>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Profile Card */}
        <View style={styles.card}>
          <View style={styles.profilePicWrapper}>
            <View style={styles.profileCircle}>
              <Ionicons name="person-outline" size={40} color="#F97316" />
            </View>

            <TouchableOpacity style={styles.cameraButton}>
              {/* TODO-API: UPLOAD_PROFILE_PICTURE */}
              {/* Request: { userId, imageFile, mimeType } */}
              {/* Response: { success, profileImageUrl } */}
              <Ionicons name="camera-outline" size={14} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>Jane Doe</Text>
          <Text style={styles.memberSince}>Member since Dec 2025</Text>

          <View style={styles.infoBox}>
            <InfoRow icon="mail-outline" label="Email" value="jane@example.com" />
            <InfoRow icon="call-outline" label="Phone" value="+1 (555) 123-4567" />
            <InfoRow
              icon="calendar-outline"
              label="Date of Birth"
              value="January 15, 1990"
            />
          </View>
        </View>

        <OptionRow
          icon={<Ionicons name="notifications-outline" size={20} color="#F97316" />}
          title="Notifications"
          subtitle="Manage your alerts"
        />

        <OptionRow
          icon={<MaterialIcons name="lock-outline" size={20} color="#2563EB" />}
          title="Privacy & Security"
          subtitle="Password, data settings"
        />

        <OptionRow
          icon={<Ionicons name="globe-outline" size={20} color="#16A34A" />}
          title="Language & Region"
          subtitle="English (US)"
        />

        <OptionRow
          icon={<Ionicons name="help-circle-outline" size={20} color="#9333EA" />}
          title="Help & Support"
          subtitle="FAQs, contact us"
        />

        <TouchableOpacity
  style={styles.logoutButton}
  onPress={() => router.push('/Logout')}
>
  <Text style={styles.logoutText}>Log Out</Text>
</TouchableOpacity>


        <Text style={styles.version}>Eye Hero Global v1.0.0</Text>
      </ScrollView>
    </ScreenSkeleton>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },

  /* ---------- Profile Card ---------- */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },

  profilePicWrapper: {
    alignItems: "center",
    marginBottom: 8,
  },

  profileCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FFF3E6",
    alignItems: "center",
    justifyContent: "center",
  },

  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 120,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  memberSince: {
    textAlign: "center",
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 12,
  },

  infoBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    padding: 12,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  infoLabel: {
    fontSize: 12,
    color: "#6B7280",
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },

  /* ---------- Options ---------- */
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  optionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },

  optionSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  /* ---------- Logout ---------- */
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#FEE2E2",
    backgroundColor: "#FFFFFF",
  },

  logoutText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#EF4444",
  },

  /* ---------- Version ---------- */
  version: {
    textAlign: "center",
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 24,
  },
});
