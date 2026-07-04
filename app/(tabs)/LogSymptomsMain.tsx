import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  onClose: () => void;
};

const SYMPTOMS = [
  { label: "Dryness", icon: "water-outline" },
  { label: "Irritation", icon: "eye-outline" },
  { label: "Eye Strain", icon: "eye-settings-outline" },
  { label: "Blurred Vision", icon: "blur" },
  { label: "Light Sensitivity", icon: "weather-sunny" },
  { label: "Pain", icon: "flash-outline" },
];

export default function LogSymptomsMain({ onClose }: Props) {
  const [eye, setEye] = useState<"Left" | "Right" | "Both">("Both");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = () => {
    const data = {
      eye,
      symptoms: selectedSymptoms,
      notes,
      date: new Date(),
    };

    // TODO-API: CREATE_SYMPTOM_LOG
    // Request: { userId, eye, symptoms[], notes, timestamp }
    // Response: { success, symptomLogId, savedAt }
    console.log("Saved Log:", data);
    onClose(); // ✅ GO BACK TO HOME
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.header}>Log Symptoms</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={22} />
          </TouchableOpacity>
        </View>

        {/* Eye Selection */}
        <Text style={styles.label}>Which eye(s) are affected?</Text>
        <View style={styles.eyeRow}>
          {["Left", "Right", "Both"].map((item) => {
            const active = eye === item;
            return (
              <TouchableOpacity
                key={item}
                onPress={() => setEye(item as any)}
                style={[
                  styles.eyeChip,
                  active && styles.eyeChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.eyeText,
                    active && styles.eyeTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Symptoms */}
        <Text style={styles.label}>What are you experiencing?</Text>
        <View style={styles.symptomsGrid}>
          {SYMPTOMS.map((item) => {
            const active = selectedSymptoms.includes(item.label);
            return (
              <TouchableOpacity
                key={item.label}
                onPress={() => toggleSymptom(item.label)}
                style={[
                  styles.symptomBox,
                  active && styles.symptomActive,
                ]}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={22}
                  color={active ? "#F97316" : "#6B7280"}
                />
                <Text
                  style={[
                    styles.symptomText,
                    active && styles.symptomTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Notes */}
        <Text style={styles.label}>Additional Notes (Optional)</Text>
        <TextInput
          placeholder="Any additional details about your symptoms..."
          style={styles.input}
          multiline
          value={notes}
          onChangeText={setNotes}
        />

        {/* Save */}
        <TouchableOpacity
          style={[
            styles.saveBtn,
            selectedSymptoms.length === 0 && { opacity: 0.6 },
          ]}
          disabled={selectedSymptoms.length === 0}
          onPress={handleSave}
        >
          <Text style={styles.saveText}>Save Entry</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Your symptom logs are private and secure
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "90%",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  header: {
    fontSize: 18,
    fontWeight: "600",
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
  },

  eyeRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  eyeChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  eyeChipActive: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FB923C",
  },

  eyeText: {
    fontSize: 13,
    color: "#374151",
  },

  eyeTextActive: {
    color: "#F97316",
    fontWeight: "600",
  },

  symptomsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  symptomBox: {
    width: "47%",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    marginBottom: 12,
  },

  symptomActive: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FB923C",
  },

  symptomText: {
    marginTop: 6,
    fontSize: 13,
    color: "#374151",
  },

  symptomTextActive: {
    color: "#F97316",
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 20,
  },

  saveBtn: {
    backgroundColor: "#FDBA74",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 8,
  },

  saveText: {
    fontSize: 14,
    fontWeight: "600",
  },

  footerText: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
  },
});
