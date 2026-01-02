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

  // ✅ GUARANTEED DELETE (NO ALERT)
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
        />
        <TabButton
          title="Doctor Notes"
          active={activeTab === "DOCTOR"}
          onPress={() => setActiveTab("DOCTOR")}
        />
      </View>

      {/* USER NOTES */}
      {activeTab === "USER" && (
        <>
          <TouchableOpacity style={styles.addBtn} onPress={addUserNote}>
            <Ionicons name="add-circle-outline" size={20} color="#2563eb" />
            <Text style={styles.addText}>Add New Note</Text>
          </TouchableOpacity>

          {userNotes.map((note) => (
            <View key={note.id.toString()} style={styles.noteCard}>
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

                    {/* ✅ DELETE WORKS */}
                    <TouchableOpacity
                      onPress={() => deleteUserNote(note.id)}
                    >
                      <Feather
                        name="trash-2"
                        size={18}
                        color="#ef4444"
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ))}
        </>
      )}

      {/* DOCTOR NOTES */}
      {activeTab === "DOCTOR" && (
        <>
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

/* ---------------- COMPONENTS ---------------- */

const TabButton = ({
  title,
  active,
  onPress,
}: {
  title: string;
  active: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.tabBtn, active && styles.tabActive]}
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

  tabRow: { flexDirection: "row", marginBottom: 16 },
  tabBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    marginHorizontal: 4,
  },
  tabActive: { backgroundColor: "#2563eb" },
  tabText: { fontWeight: "600", color: "#374151" },
  tabTextActive: { color: "#fff" },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  addText: { marginLeft: 6, color: "#2563eb", fontWeight: "600" },

  noteCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },

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
