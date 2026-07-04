import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
    Platform,
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

export default function BookAppointmentMain({ onClose }: Props) {
  const [appointmentType, setAppointmentType] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [visitType, setVisitType] = useState<"In-Person" | "Virtual">(
    "In-Person"
  );
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    const payload = {
      appointmentType,
      doctor,
      date,
      visitType,
      notes,
    };

    // TODO-API: CREATE_APPOINTMENT
    // Request: { userId, appointmentType, preferredDoctorId, preferredDate, visitType, notes }
    // Response: { success, appointmentId, confirmationNumber, estimatedConfirmationTime }
    console.log("Appointment Requested:", payload);
    onClose(); // ✅ go back to home / appointments
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.header}>Book Appointment</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={22} />
          </TouchableOpacity>
        </View>

        {/* Appointment Type */}
        <Text style={styles.label}>Appointment Type</Text>
        <TextInput
          style={styles.input}
          placeholder="Routine checkup, follow-up..."
          value={appointmentType}
          onChangeText={setAppointmentType}
        />

        {/* Preferred Doctor */}
        <Text style={styles.label}>Preferred Doctor</Text>
        <TextInput
          style={styles.input}
          placeholder="Doctor name"
          value={doctor}
          onChangeText={setDoctor}
        />

        {/* Preferred Date */}
        <Text style={styles.label}>Preferred Date</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowPicker(true)}
        >
          <Text style={{ color: date ? "#111" : "#9CA3AF" }}>
            {date ? date.toDateString() : "Select date"}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        {/* Visit Type */}
        <Text style={styles.label}>Visit Type</Text>
        <View style={styles.optionsRow}>
          {["In-Person", "Virtual"].map((type) => {
            const active = visitType === type;
            return (
              <TouchableOpacity
                key={type}
                onPress={() => setVisitType(type as any)}
                style={[
                  styles.optionBox,
                  active && styles.optionActive,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    active && styles.optionTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Notes */}
        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput
          style={styles.notesBox}
          placeholder="Any specific concerns or symptoms..."
          multiline
          value={notes}
          onChangeText={setNotes}
        />

        {/* Submit */}
        <TouchableOpacity
          style={[
            styles.button,
            !appointmentType || !date ? { opacity: 0.6 } : null,
          ]}
          disabled={!appointmentType || !date}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Request Appointment</Text>
        </TouchableOpacity>
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
    marginTop: 16,
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  optionsRow: {
    flexDirection: "row",
    gap: 12,
  },

  optionBox: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },

  optionActive: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FB923C",
  },

  optionText: {
    fontSize: 14,
    color: "#374151",
  },

  optionTextActive: {
    color: "#F97316",
    fontWeight: "600",
  },

  notesBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
    minHeight: 90,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#FF6A00",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 12,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
