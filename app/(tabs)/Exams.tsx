import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type TabType = "user" | "doctor";

const Exams: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("user");

  const handleSchedule = () => {
    Alert.alert("Follow-up Scheduled", "Your follow-up appointment is requested.");
  };

  const handleCalendar = () => {
    Alert.alert("Added to Calendar", "The appointment has been added.");
  };

  const handleShare = () => {
    Alert.alert("Share", "Sharing report...");
  };

  const handleDownload = () => {
    Alert.alert("Download", "Downloading report...");
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} onPress={()=> router.push("/(tabs)/Home")}/>

        <View>
          <Text style={styles.headerTitle}>Eye Exam Record</Text>
          <Text style={styles.headerDate}>December 15, 2025</Text>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={handleShare}>
            <Ionicons name="share-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDownload}>
            <Ionicons name="download-outline" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* TAB SWITCH */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "user" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("user")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "user" && styles.activeTabText,
            ]}
          >
            Your Notes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "doctor" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("doctor")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "doctor" && styles.activeTabText,
            ]}
          >
            Doctor's Notes
          </Text>
        </TouchableOpacity>
      </View>

      {/* ORANGE CARD */}
      <View style={styles.examCard}>
        <Text style={styles.examTitle}>
          Annual Comprehensive Eye Exam
        </Text>

        <Text style={styles.examDoctor}>with Dr. Sarah Johnson</Text>

        <Text style={styles.locationLabel}>Location</Text>
        <Text style={styles.location}>Vision Care Center</Text>
      </View>

      {/* USER NOTES */}
      {activeTab === "user" && (
        <View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Symptoms You Reported</Text>

            <Text style={styles.bullet}>
              • Occasional dry eyes after extended screen time
            </Text>

            <Text style={styles.bullet}>
              • Mild blurriness when reading small text
            </Text>

            <Text style={styles.bullet}>
              • Light sensitivity in bright sunlight
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Concerns</Text>

            <Text style={styles.bullet}>
              • Worried about increased screen time affecting vision
            </Text>

            <Text style={styles.bullet}>
              • Family history of glaucoma
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Questions You Asked</Text>

            <Text style={styles.bullet}>
              • Should I use blue light glasses?
            </Text>

            <Text style={styles.bullet}>
              • How often should I take screen breaks?
            </Text>
          </View>
        </View>
      )}

      {/* DOCTOR NOTES */}
      {activeTab === "doctor" && (
        <View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Diagnosis</Text>
            <Text style={styles.highlight}>
              Healthy eyes with mild computer vision syndrome
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Clinical Findings</Text>

            <Text style={styles.bullet}>
              • No signs of glaucoma or retinal issues
            </Text>

            <Text style={styles.bullet}>
              • Optic nerve appears healthy
            </Text>

            <Text style={styles.bullet}>
              • Mild dry eye symptoms consistent with digital eye strain
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Doctor's Recommendations
            </Text>

            <Text style={styles.bullet}>• Follow the 20-20-20 rule</Text>
            <Text style={styles.bullet}>
              • Use artificial tears as needed
            </Text>
            <Text style={styles.bullet}>
              • Updated prescription provided
            </Text>
            <Text style={styles.bullet}>
              • Schedule follow-up in 12 months
            </Text>
          </View>
        </View>
      )}

      {/* BUTTONS */}
      <TouchableOpacity style={styles.primaryBtn} onPress={handleSchedule}>
        <Text style={styles.btnText}>Schedule Follow-up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn} onPress={handleCalendar}>
        <Text style={styles.secondaryText}>Add to Calendar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Exams;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  headerDate: {
    color: "gray",
  },

  headerIcons: {
    flexDirection: "row",
    gap: 15,
  },

  tabContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },

  tabButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#EDEDED",
    alignItems: "center",
    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: "#FF6A00",
  },

  tabText: {
    fontWeight: "500",
  },

  activeTabText: {
    color: "white",
  },

  examCard: {
    backgroundColor: "#FF6A00",
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
  },

  examTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  examDoctor: {
    color: "white",
    marginBottom: 10,
  },

  locationLabel: {
    color: "white",
    fontSize: 12,
  },

  location: {
    color: "white",
    fontWeight: "600",
  },

  section: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  bullet: {
    marginBottom: 6,
    color: "#444",
  },

  highlight: {
    color: "#2E7D32",
    fontWeight: "600",
  },

  primaryBtn: {
    backgroundColor: "#FF6A00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  btnText: {
    color: "white",
    fontWeight: "600",
  },

  secondaryBtn: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },

  secondaryText: {
    color: "#444",
  },
});