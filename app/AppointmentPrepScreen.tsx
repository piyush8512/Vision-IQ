import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";

export default function AppointmentPrepScreen() {
  /* ------------------ STATES ------------------ */

  const [symptoms, setSymptoms] = useState([
    {
      id: 1,
      title: "Eye dryness",
      frequency: "Daily",
      note: "Worse after screen",
      severity: "Moderate",
    },
    {
      id: 2,
      title: "Blurry vision",
      frequency: "2–3 times/week",
      note: "More reading small text",
      severity: "Mild",
    },
  ]);

  const [questions, setQuestions] = useState([
    { id: 1, text: "Should I be concerned about my dry eyes?" },
    { id: 2, text: "What can I do to reduce screen-related eye strain?" },
    { id: 3, text: "Do I need a new prescription?" },
  ]);

  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Artificial Tears",
      dosage: "As needed",
      frequency: "3–4 times daily",
    },
    {
      id: 2,
      name: "Vitamin A Supplement",
      dosage: "5000 IU",
      frequency: "Daily",
    },
  ]);

  /* ------------------ HANDLERS ------------------ */

  interface Symptom {
    id: number;
    title: string;
    frequency: string;
    note: string;
    severity: string;
  }

  interface Question {
    id: number;
    text: string;
  }

  interface Medication {
    id: number;
    name: string;
    dosage: string;
    frequency: string;
  }

  const updateSymptom = (id: number, field: keyof Symptom, value: string): void => {
    setSymptoms((prev: Symptom[]) =>
      prev.map((s: Symptom) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const addSymptom = () => {
    setSymptoms((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "",
        frequency: "",
        note: "",
        severity: "Mild",
      },
    ]);
  };

  const deleteItem = <T extends { id: number }>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    id: number
  ): void => {
    setter((prev) => prev.filter((item) => item.id !== id));
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, { id: Date.now(), text: "" }]);
  };

  const addMedication = () => {
    setMedications((prev) => [
      ...prev,
      { id: Date.now(), name: "", dosage: "", frequency: "" },
    ]);
  };

  /* ------------------ UI ------------------ */

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Appointment Prep</Text>
      <Text style={styles.subHeader}>Get ready for your visit</Text>

      {/* Appointment Card */}
      <View style={styles.cardOrange}>
        <Text style={styles.cardTitle}>Next Appointment</Text>
        <Text style={styles.cardBold}>Annual Eye Exam with Dr. Sarah Johnson</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.cardText}>Dec 28, 2025 • 2:00 PM</Text>
          <Text style={styles.cardText}>Vision Care Centre</Text>
        </View>
      </View>

      {/* Symptoms */}
      <SectionHeader title="Symptoms to Discuss" />
      {symptoms.map((s) => (
        <View key={s.id} style={styles.card}>
          <TextInput
            style={styles.inputTitle}
            placeholder="Symptom name"
            value={s.title}
            onChangeText={(t) => updateSymptom(s.id, "title", t)}
          />
          <TextInput
            style={styles.input}
            placeholder="Frequency"
            value={s.frequency}
            onChangeText={(t) => updateSymptom(s.id, "frequency", t)}
          />
          <TextInput
            style={styles.input}
            placeholder="Notes"
            value={s.note}
            onChangeText={(t) => updateSymptom(s.id, "note", t)}
          />
          <View style={styles.rowBetween}>
            <Text style={styles.severity}>{s.severity}</Text>
            <TouchableOpacity onPress={() => deleteItem(setSymptoms, s.id)}>
              <Ionicons name="trash-outline" size={20} color="#ff5a5a" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <AddButton label="Add Symptom" onPress={addSymptom} />

      {/* Questions */}
      <SectionHeader title="Questions for Doctor" />
      {questions.map((q) => (
        <View key={q.id} style={styles.rowInput}>
          <Ionicons name="ellipse-outline" size={18} color="#666" />
          <TextInput
            style={styles.questionInput}
            placeholder="Type your question"
            value={q.text}
            onChangeText={(t) =>
              setQuestions((prev) =>
                prev.map((item) =>
                  item.id === q.id ? { ...item, text: t } : item
                )
              )
            }
          />
          <TouchableOpacity onPress={() => deleteItem(setQuestions, q.id)}>
            <Feather name="x" size={18} color="#999" />
          </TouchableOpacity>
        </View>
      ))}
      <AddButton label="Add Question" onPress={addQuestion} />

      {/* Medications */}
      <SectionHeader title="Current Medications & Supplements" />
      {medications.map((m) => (
        <View key={m.id} style={styles.card}>
          <TextInput
            style={styles.inputTitle}
            placeholder="Medication name"
            value={m.name}
            onChangeText={(t) =>
              setMedications((prev) =>
                prev.map((item) =>
                  item.id === m.id ? { ...item, name: t } : item
                )
              )
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Dosage"
            value={m.dosage}
            onChangeText={(t) =>
              setMedications((prev) =>
                prev.map((item) =>
                  item.id === m.id ? { ...item, dosage: t } : item
                )
              )
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Frequency"
            value={m.frequency}
            onChangeText={(t) =>
              setMedications((prev) =>
                prev.map((item) =>
                  item.id === m.id ? { ...item, frequency: t } : item
                )
              )
            }
          />
          <TouchableOpacity onPress={() => deleteItem(setMedications, m.id)}>
            <Ionicons name="trash-outline" size={20} color="#ff5a5a" />
          </TouchableOpacity>
        </View>
      ))}
      <AddButton label="Add Medication" onPress={addMedication} />

      {/* Footer Buttons */}
      <TouchableOpacity style={styles.primaryBtn}>
        <Text style={styles.primaryText}>Share Prep Summary</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn}>
        <Text style={styles.secondaryText}>Print Checklist</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

/* ------------------ REUSABLE COMPONENTS ------------------ */

const SectionHeader = ({ title }: { title: string }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const AddButton = ({ label, onPress }: { label: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.addBtn} onPress={onPress}>
    <MaterialIcons name="add-circle-outline" size={20} color="#ff6b00" />
    <Text style={styles.addText}>{label}</Text>
  </TouchableOpacity>
);

/* ------------------ STYLES ------------------ */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fb", padding: 16 },
  header: { fontSize: 22, fontWeight: "700" },
  subHeader: { color: "#777", marginBottom: 16 },

  cardOrange: {
    backgroundColor: "#ff6b00",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  cardTitle: { color: "#fff", opacity: 0.9 },
  cardBold: { color: "#fff", fontWeight: "700", marginVertical: 6 },
  cardText: { color: "#fff", fontSize: 12 },

  sectionHeader: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },

  inputTitle: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 6,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginBottom: 6,
    paddingVertical: 4,
  },

  severity: {
    backgroundColor: "#ffe5d0",
    color: "#ff6b00",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rowInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
  },

  questionInput: {
    flex: 1,
    marginHorizontal: 8,
  },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  addText: {
    marginLeft: 6,
    color: "#ff6b00",
    fontWeight: "600",
  },

  primaryBtn: {
    backgroundColor: "#ff6b00",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
  },

  primaryText: { color: "#fff", fontWeight: "700" },

  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#ff6b00",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  secondaryText: { color: "#ff6b00", fontWeight: "700" },
});

