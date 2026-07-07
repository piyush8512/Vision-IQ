import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { completeOnboarding } from "@/api/profile";

const GOALS = [
  {
    id: "strain",
    title: "Reduce Eye Strain",
    subtitle: "Get reminders to rest your eyes",
    icon: "eye-outline",
  },
  {
    id: "screen",
    title: "Manage Screen Time",
    subtitle: "Track and reduce digital exposure",
    icon: "phone-portrait-outline",
  },
  {
    id: "sleep",
    title: "Improve Sleep Quality",
    subtitle: "Blue light and bedtime tips",
    icon: "moon-outline",
  },
  {
    id: "vision",
    title: "Monitor Vision Health",
    subtitle: "Regular vision tests and tracking",
    icon: "radio-button-on-outline",
  },
];

export default function EyeCareGoalsCard() {
const {
 dob,
 lastExam,
 gender,
 visionAid
} = useLocalSearchParams();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  async function handleComplete(){
try{
await completeOnboarding({
date_of_birth: dob as string,
gender: gender as 
| "Female"
| "Male"
| "Non-binary"
| "Prefer not to say",

vision_aids: visionAid as
| "Glasses"
| "Contacts"
| "None",
last_exam_date: lastExam as string,
eye_care_goals: selectedGoals
});
router.replace("/onboarding-complete");
}catch(error){
console.log(error);
}
}

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id)
        ? prev.filter((g) => g !== id)
        : [...prev, id]
    );
  };

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
        <View style={[styles.progressItem, styles.active]} />
        <View style={styles.progressItem} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Your Eye Care Goals</Text>
      <Text style={styles.subtitle}>
        Choose what matters most to you. Select all that apply.
      </Text>

      {/* Goals */}
      {GOALS.map((goal) => {
        const selected = selectedGoals.includes(goal.title);
        return (
          <Pressable
            key={goal.id}
            style={[
              styles.goalItem,
              selected && styles.goalItemSelected,
            ]}
            onPress={() => toggleGoal(goal.title)}
          >
            <View style={styles.goalLeft}>
              <View style={styles.iconBox}>
                <Ionicons
                  name={goal.icon as any}
                  size={18}
                  color="#FF6A00"
                />
              </View>
              <View>
                <Text style={styles.goalTitle}>
                  {goal.title}
                </Text>
                <Text style={styles.goalSubtitle}>
                  {goal.subtitle}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.radio,
                selected && styles.radioSelected,
              ]}
            />
          </Pressable>
        );
      })}

      {/* Continue */}
      <TouchableOpacity
        style={[
          styles.button,
          selectedGoals.length === 0 && styles.buttonDisabled,
        ]}
        disabled={selectedGoals.length === 0}
        onPress={handleComplete}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        You can update your goals anytime.
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

  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  goalItemSelected: {
    borderColor: "#FF6A00",
    backgroundColor: "#FFE6D5",
  },

  goalLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#FFE6D5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  goalTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },
  goalSubtitle: {
    fontSize: 12,
    color: "#6B7280",
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
  },
  radioSelected: {
    borderColor: "#FF6A00",
    backgroundColor: "#FF6A00",
  },

  button: {
    backgroundColor: "#FF6A00",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 16,
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
});
