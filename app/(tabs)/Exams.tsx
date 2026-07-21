import { Appointment, getAppointment } from "@/api/appointment";
import { ExamRecord, getExamRecordByAppointment } from "@/api/examRecordDoctor";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type TabType = "user" | "doctor";

type VisionMeasurements = {
  right_eye: {
    sphere: string;
    cylinder: string;
    axis: number;
    visual_acuity: string;
    iop: string;
  };
  left_eye: {
    sphere: string;
    cylinder: string;
    axis: number;
    visual_acuity: string;
    iop: string;
  };
};

type UserNote = {
  id: string;
  type: "Symptom" | "Question" | "Note" | "Reminder" | "Concern";
  content: string;
  created_at: string;
  updated_at: string;
};

type ExamRecordView = ExamRecord & {
  clinical_findings: string[];
  recommendations: string[];
  prescription_changes: string[];
  vision_measurements: VisionMeasurements;
};

const Exams: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("user");
  const [examRecord, setExamRecord] = useState<ExamRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loadingappointment, setLoadingappointment] = useState(true);
  const userNotes = appointment?.user_notes as UserNote[] | undefined;

  const record = examRecord as ExamRecordView | null;
  const vision = record?.vision_measurements;

  // const { appointmentId } = useLocalSearchParams();

  const appointmentId = "4988d069-b394-4359-bf6a-74d4d34aeb8f"; // for testing

  const handleSchedule = () => {
    Alert.alert(
      "Follow-up Scheduled",
      "Your follow-up appointment is requested.",
    );
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

  const loadExamRecord = async () => {
    try {
      setLoading(true);
      const data = await getExamRecordByAppointment(appointmentId);
      setExamRecord(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to load exam record.");
    } finally {
      setLoading(false);
    }
  };

  const appointmentDetails = async () => {
    try {
      setLoadingappointment(true);
      const data = await getAppointment(appointmentId);
      setAppointment(data);
      setLoadingappointment(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to load appointment details.");
      setLoadingappointment(false);
    }
  };

  useEffect(() => {
    loadExamRecord();
    appointmentDetails();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={22}
          onPress={() => router.push("/(tabs)/Home")}
        />

        <View>
          <Text style={styles.headerTitle}>Eye Exam Record</Text>
          <Text style={styles.headerDate}>{appointment?.appointment_date}</Text>
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
          style={[styles.tabButton, activeTab === "user" && styles.activeTab]}
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
          style={[styles.tabButton, activeTab === "doctor" && styles.activeTab]}
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
        <Text style={styles.examTitle}>Annual Comprehensive Eye Exam</Text>

        <Text style={styles.examDoctor}>
          with {appointment?.provider_name || "Dr. John Doe"}
        </Text>

        <Text style={styles.locationLabel}>Location</Text>
        <Text style={styles.location}>{appointment?.place}</Text>
      </View>

      {/* USER NOTES */}
      {activeTab === "user" && (
        <View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Symptoms You Reported</Text>

            {userNotes
              ?.filter((item) => item.type === "Symptom")
              .map((item) => (
                <Text key={item.id} style={styles.bullet}>
                  • {item.content}
                </Text>
              ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Concerns</Text>

            {userNotes
              ?.filter((item) => item.type === "Concern")
              .map((item) => (
                <Text key={item.id} style={styles.bullet}>
                  • {item.content}
                </Text>
              ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Questions You Asked</Text>

            {userNotes
              ?.filter((item) => item.type === "Question")
              .map((item) => (
                <Text key={item.id} style={styles.bullet}>
                  • {item.content}
                </Text>
              ))}
          </View>
        </View>
      )}

      {/* DOCTOR NOTES */}
      {activeTab === "doctor" && (
        <View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Diagnosis</Text>
            <Text style={styles.highlight}>
              {examRecord?.diagnosis ?? "No diagnosis available"}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vision Measurements</Text>

            <Text style={styles.bullet}>
              Right Eye Sphere: {vision?.right_eye.sphere}
            </Text>

            <Text style={styles.bullet}>
              Right Eye Cylinder: {vision?.right_eye.cylinder}
            </Text>

            <Text style={styles.bullet}>
              Right Eye Axis: {vision?.right_eye.axis}
            </Text>

            <Text style={styles.bullet}>
              Right Eye Visual Acuity: {vision?.right_eye.visual_acuity}
            </Text>

            <Text style={styles.bullet}>
              Right Eye IOP: {vision?.right_eye.iop}
            </Text>

            <Text style={styles.bullet}>
              Left Eye Sphere: {vision?.left_eye.sphere}
            </Text>

            <Text style={styles.bullet}>
              Left Eye Cylinder: {vision?.left_eye.cylinder}
            </Text>

            <Text style={styles.bullet}>
              Left Eye Axis: {vision?.left_eye.axis}
            </Text>

            <Text style={styles.bullet}>
              Left Eye Visual Acuity: {vision?.left_eye.visual_acuity}
            </Text>

            <Text style={styles.bullet}>
              Left Eye IOP: {vision?.left_eye.iop}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Clinical Findings</Text>

            {record?.clinical_findings?.map((finding, index) => (
              <Text key={index} style={styles.bullet}>
                • {finding}
              </Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Doctor's Recommendations</Text>

            {record?.recommendations?.map((recommendation, index) => (
              <Text key={index} style={styles.bullet}>
                • {recommendation}
              </Text>
            ))}
          </View>
          {/*prescription section*/}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prescription Changes</Text>
            {record?.prescription_changes?.map((item, index) => (
              <Text key={index} style={styles.bullet}>
                • {item}
              </Text>
            ))}
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
