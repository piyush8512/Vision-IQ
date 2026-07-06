import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/* ---------------- TYPES ---------------- */

interface UserNote {
  id: number;
  type: string;
  text: string;
  date: string;
}

interface DoctorNote {
  id: number;
  type: string;
  text: string;
  date: string;
  doctor: string;
}

/* ---------------- SCREEN ---------------- */

export default function AppointmentNotesScreen() {
  const [activeTab, setActiveTab] = useState<"USER" | "DOCTOR">("USER");

  const [userNotes, setUserNotes] = useState<UserNote[]>([
    {
      id: 1,
      type: "Symptom",
      text: "Experiencing dry eyes after 4+ hours of screen time",
      date: "Dec 15, 2025 • 9:30 AM",
    },
    {
      id: 2,
      type: "Question",
      text: "Ask doctor about blue light glasses effectiveness",
      date: "Dec 15, 2025 • 10:15 AM",
    },
    {
      id: 3,
      type: "Reminder",
      text: "Remember to bring current glasses for comparison",
      date: "Dec 15, 2025 • 11:00 AM",
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  /* ---------------- USER ACTIONS ---------------- */

  const addUserNote = () => {
    setUserNotes((prev) => [
      {
        id: Date.now(),
        type: "Note",
        text: "",
        date: "Just now",
      },
      ...prev,
    ]);
  };

  const deleteUserNote = (id: number) => {
    setUserNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const saveEdit = (id: number) => {
    setUserNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, text: editingText } : note
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  /* ---------------- DOCTOR NOTES ---------------- */

  const doctorNotes: DoctorNote[] = [
    {
      id: 1,
      type: "Diagnosis",
      text:
        "Patient presents with mild computer vision syndrome. Visual acuity 20/20 both eyes.",
      date: "Dec 15, 2025 • 2:30 PM",
      doctor: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      type: "Prescription",
      text:
        "Updated prescription: OD -1.25 -0.50 x180, OS -1.50 -0.25 x175.",
      date: "Dec 15, 2025 • 2:45 PM",
      doctor: "Dr. Sarah Johnson",
    },
    {
      id: 3,
      type: "Recommendation",
      text:
        "Follow 20-20-20 rule. Every 20 minutes, look 20 feet away for 20 seconds. Use artificial tears daily.",
      date: "Dec 15, 2025 • 2:50 PM",
      doctor: "Dr. Sarah Johnson",
    },
  ];

  /* ---------------- UI ---------------- */

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Appointment Notes</Text>
      <Text style={styles.subHeader}>Annual Eye Exam</Text>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TabButton
          title="Your Notes"
          active={activeTab === "USER"}
          onPress={() => setActiveTab("USER")}
          type="USER"
        />
        <TabButton
          title="Doctor Notes"
          active={activeTab === "DOCTOR"}
          onPress={() => setActiveTab("DOCTOR")}
          type="DOCTOR"
        />
      </View>

      {/* ---------------- USER NOTES ---------------- */}
      {activeTab === "USER" && (
        <>
          {/* Blue info box */}
          <View style={styles.infoCardBlue}>
            <Text style={styles.infoTitle}>Your Personal Notes</Text>
            <Text style={styles.infoText}>
              Track symptoms, questions, and observations to discuss with your
              doctor. Only you can see and edit these notes.
            </Text>
          </View>

          {/* Add button */}
          <TouchableOpacity style={styles.addBtn} onPress={addUserNote}>
            <Ionicons name="add-circle-outline" size={20} color="#2563eb" />
            <Text style={styles.addText}>Add New Note</Text>
          </TouchableOpacity>

          {userNotes.map((note) => (
            <View key={note.id.toString()} style={styles.noteCard}>
              
              {/* Badge */}
              <View
                style={[
                  styles.badge,
                  note.type === "Symptom" && styles.symptom,
                  note.type === "Question" && styles.question,
                  note.type === "Reminder" && styles.reminder,
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    note.type === "Symptom" && styles.symptomText,
                    note.type === "Question" && styles.questionText,
                    note.type === "Reminder" && styles.reminderText,
                  ]}
                >
                  {note.type}
                </Text>
              </View>

              <Text style={styles.date}>{note.date}</Text>

              {editingId === note.id ? (
                <>
                  <TextInput
                    style={styles.editInput}
                    value={editingText}
                    onChangeText={setEditingText}
                    multiline
                    autoFocus
                  />
                  <TouchableOpacity onPress={() => saveEdit(note.id)}>
                    <Text style={styles.saveText}>Save</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.noteText}>
                    {note.text || "Tap edit to add text"}
                  </Text>

                  <View style={styles.actionsRow}>
                    <TouchableOpacity
                      onPress={() => {
                        setEditingId(note.id);
                        setEditingText(note.text);
                      }}
                    >
                      <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => deleteUserNote(note.id)}
                    >
                      <Feather name="trash-2" size={18} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ))}
        </>
      )}

      {/* ---------------- DOCTOR NOTES ---------------- */}
      {activeTab === "DOCTOR" && (
        <>
          <View style={styles.infoCardGreen}>
            <Text style={styles.infoTitleGreen}>
              Clinical Notes from Your Doctor
            </Text>
            <Text style={styles.infoTextGreen}>
              These notes are provided by your healthcare provider and contain
              diagnosis, prescriptions, and recommendations.
            </Text>
          </View>

          <View style={styles.infoCardYellow}>
            <Text style={styles.infoTextYellow}>
              Doctor's notes are read-only. If you have questions, contact your
              provider.
            </Text>
          </View>

          {doctorNotes.map((note) => (
            <View key={note.id.toString()} style={styles.noteCard}>
              <Text style={styles.date}>{note.date}</Text>
              <Text style={styles.noteText}>{note.text}</Text>
              <Text style={styles.doctorName}>{note.doctor}</Text>
            </View>
          ))}
        </>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

/* ---------------- TAB COMPONENT ---------------- */

const TabButton = ({
  title,
  active,
  onPress,
  type,
}: {
  title: string;
  active: boolean;
  onPress: () => void;
  type: "USER" | "DOCTOR";
}) => (
  <TouchableOpacity
    style={[
      styles.tabBtn,
      active && (type === "USER" ? styles.tabActiveUser : styles.tabActiveDoctor),
    ]}
    onPress={onPress}
  >
    <Text style={[styles.tabText, active && styles.tabTextActive]}>
      {title}
    </Text>
  </TouchableOpacity>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc", padding: 16 },
  header: { fontSize: 22, fontWeight: "700" },
  subHeader: { color: "#6b7280", marginBottom: 16 },

  /* tabs */
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#e5e7eb",
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
  },
  tabBtn: { flex: 1, padding: 12, borderRadius: 10, alignItems: "center" },
  tabActiveUser: { backgroundColor: "#2563eb" },
  tabActiveDoctor: { backgroundColor: "#16a34a" },
  tabText: { fontWeight: "600", color: "#6b7280" },
  tabTextActive: { color: "#fff" },

  /* info cards */
  infoCardBlue: {
    backgroundColor: "#e0f2fe",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
  },
  infoTitle: { fontWeight: "700", marginBottom: 4, color: "#0369a1" },
  infoText: { fontSize: 13, color: "#0369a1" },

  infoCardGreen: {
    backgroundColor: "#dcfce7",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },
  infoTitleGreen: { fontWeight: "700", color: "#166534", marginBottom: 4 },
  infoTextGreen: { fontSize: 13, color: "#166534" },

  infoCardYellow: {
    backgroundColor: "#fef3c7",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
  },
  infoTextYellow: { fontSize: 13, color: "#92400e" },

  /* add btn */
  addBtn: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  addText: { marginLeft: 6, color: "#2563eb", fontWeight: "600" },

  /* note card */
  noteCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },

  /* badge */
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 6,
  },
  badgeText: { fontSize: 11, fontWeight: "600" },
  symptom: { backgroundColor: "#fee2e2" },
  question: { backgroundColor: "#e0e7ff" },
  reminder: { backgroundColor: "#fef9c3" },
  symptomText: { color: "#dc2626" },
  questionText: { color: "#3730a3" },
  reminderText: { color: "#a16207" },

  date: { fontSize: 11, color: "#6b7280", marginBottom: 6 },
  noteText: { fontSize: 14, marginBottom: 8 },
  doctorName: { fontSize: 12, color: "#2563eb", fontWeight: "600" },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editText: { color: "#2563eb", fontWeight: "600" },
  saveText: { color: "#16a34a", fontWeight: "700" },

  editInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
});
