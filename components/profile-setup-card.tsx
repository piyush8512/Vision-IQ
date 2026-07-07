import { getProfile } from "@/api/profile";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function ProfileSetupCard() {
  // TODO-API: CREATE_PROFILE_REQUEST
  // Request: { userId, dateOfBirth, lastExamDate, gender, visionAids, medicalConditions }
  // Response: { success, profileId }
  
  const [dob, setDob] = useState("");
  const [lastExam, setLastExam] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [visionAid, setVisionAid] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);

useEffect(() => {
async function loadProfile(){
try{
const profile = await getProfile();
if(profile.date_of_birth){
 setDob(profile.date_of_birth);
}
if(profile.gender){
 setGender(profile.gender);
}
if(profile.vision_aids){
 setVisionAid(profile.vision_aids);
}
if(profile.last_exam_date){
 setLastExam(profile.last_exam_date);
}
}catch(error){
console.log(error);
}
}
loadProfile();
},[]);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB");

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressItem, styles.active]} />
        <View style={[styles.progressItem, styles.active]} />
        <View style={[styles.progressItem, styles.active]} />
        <View style={styles.progressItem} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Profile Setup</Text>
      <Text style={styles.subtitle}>
        Help us personalize your eye care journey.
      </Text>

      {/* Date of Birth */}
     <View style={styles.inputWithIcon}>
  <TextInput
    placeholder="DD / MM / YYYY"
    value={dob}
    onChangeText={setDob}
    style={styles.inputFlex}
    keyboardType="numeric"
  />
  <Ionicons name="calendar-outline" size={20} color="#9CA3AF" />
</View>


      {/* Gender */}
      <Text style={styles.label}>Gender</Text>
      <View style={styles.optionGrid}>
        {["Female", "Male", "Non-binary", "Prefer not to say"].map(
          (item) => (
            <Pressable
              key={item}
              style={[
                styles.option,
                gender === item && styles.optionSelected,
              ]}
              onPress={() => setGender(item)}
            >
              <Text
                style={
                  gender === item
                    ? styles.optionTextSelected
                    : styles.optionText
                }
              >
                {item}
              </Text>
            </Pressable>
          )
        )}
      </View>

      {/* Vision Aid */}
      <Text style={styles.label}>
        Do you wear glasses or contact lenses?
      </Text>
      <View style={styles.optionRow}>
        {["Glasses", "Contacts", "None"].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.optionSmall,
              visionAid === item && styles.optionSelected,
            ]}
            onPress={() => setVisionAid(item)}
          >
            <Text
              style={
                visionAid === item
                  ? styles.optionTextSelected
                  : styles.optionText
              }
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Last Eye Exam */}
      <Text style={styles.label}>
        When was your last eye exam?
      </Text>
      <TextInput
        placeholder="Enter date"
        value={lastExam}
        onChangeText={setLastExam}
        style={styles.input}
      />

      {/* Continue */}
      <TouchableOpacity
        style={[
          styles.button,
          !(dob && gender && visionAid) && styles.buttonDisabled,
        ]}
        disabled={!(dob && gender && visionAid)}
        onPress={() =>   router.push({
    pathname: "/eye-care-goals",
    params:{
      dob,
      lastExam,
      gender,
      visionAid
    }
  })}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Your health data is private and secure.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF7F0",
    borderRadius: 24,
    padding: 24,
  },

  header: {
    marginBottom: 16,
  },

  progressContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  progressItem: {
    flex: 1,
    height: 3,
    backgroundColor: "#E5E7EB",
    marginRight: 6,
    borderRadius: 2,
  },
  active: {
    backgroundColor: "#FF6A00",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
    color: "#111",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
  },

  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 8,
  },

  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: "#fff",
    marginBottom: 16,
  },

  placeholder: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  inputText: {
    color: "#111",
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    backgroundColor: "#fff",
  },

  optionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  option: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  optionSmall: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginHorizontal: 4,
    backgroundColor: "#fff",
  },

  optionSelected: {
    borderColor: "#FF6A00",
    backgroundColor: "#FFE6D5",
  },
  optionText: {
    color: "#111",
    fontSize: 14,
  },
  optionTextSelected: {
    color: "#FF6A00",
    fontSize: 14,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#FF6A00",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  buttonDisabled: {
    backgroundColor: "#FFB37A",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#9CA3AF",
  },
  inputFlex: {
  flex: 1,
  fontSize: 14,
  color: "#111",
},

});
