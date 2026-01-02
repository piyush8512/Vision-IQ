import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Modal,
} from "react-native";

import Header from "@/components/Header";
import Card from "@/components/Card";
import SmallBox from "@/components/SmallBox";
import { ScreenSkeleton } from "@/components/layouts/ScreenSkeleton";
import LogSymptomsMain from "@/app/(tabs)/LogSymptomsMain";
import BookAppointmentMain from "@/app/(tabs)/book-appointment";
import { router } from "expo-router";



export default function HomeScreen() {
  const [showLogSymptoms, setShowLogSymptoms] = useState(false);

  return (
    <ScreenSkeleton>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Header name="Jane" />

        {/* Daily Eye Check */}
        <Card
          title="Daily Eye Check"
          subtitle="Take 2 minutes to log how your eyes feel today"
          buttonText="Log Symptoms"
          onPress={() => setShowLogSymptoms(true)}
          variant="highlight"
        />

        {/* Your Eye Health */}
        <Card
          title="Your Eye Health"
          rightText="View All"
          items={[
            {
              icon: "trending-up-outline",
              label: "Vision Trend",
              value: "Stable this month",
            },
            {
              icon: "time-outline",
              label: "Screen Time",
              value: "6.5 hours today",
            },
          ]}
        />

        {/* Upcoming */}
        <Card
          title="Upcoming"
          rightText="View All"
          items={[
            {
              icon: "calendar-outline",
              label: "Annual Eye Exam",
              value: "Dec 18, 2025 at 2:00 PM",
            },
          ]}
        />

        {/* Today's Tip */}
        <Card
          title="Today's Tip"
          subtitle="Follow the 20-20-20 rule. Every 20 minutes, look at something 20 feet away for 20 seconds."
          buttonText="Learn More"
        />

        {/* Quick Actions */}
        <View style={styles.grid}>
          <SmallBox title="My Notes" icon="document-outline" color="#F59E0B" onPress={() => router.push("/AppointmentNotesScreen")} />
          <SmallBox title="Symptom Tracker" icon="pulse-outline" color="#EF4444" onPress={() => {}} />
          <SmallBox title="Find Doctor" icon="location-outline" color="#3B82F6" onPress={() => {}} />
          <SmallBox
  title="Family History"
  icon="people-outline"
  color="#8B5CF6"
  onPress={() => router.push("/familyHealthHistory")}
/>

          <SmallBox title="Appointment Prep" icon="calendar-outline" color="#10B981" onPress={() => router.push("/AppointmentPrepScreen")} />
          <SmallBox title="Exam Records" icon="folder-outline" color="#6366F1" onPress={() => {}} />
        </View>

        {/* Recent Exams */}
        <Card
          title="Recent Exams"
          rightText="View All"
          items={[
            {
              icon: "document-text-outline",
              label: "Annual Eye Exam",
              value: "Dec 15, 2025 · Dr. Sarah Johnson",
            },
          ]}
        />
      </ScrollView>

      {/* Log Symptoms Tab */}
      <Modal
        visible={showLogSymptoms}
        animationType="slide"
        transparent
        onRequestClose={() => setShowLogSymptoms(false)} // Android back
      >
        <View style={styles.modalWrapper}>
          <LogSymptomsMain onClose={() => setShowLogSymptoms(false)} />
        </View>
      </Modal>

      {/* Book Appointment Tab */}
      <Modal
        visible={showBook}
        animationType="slide"
        transparent
        onRequestClose={() => setShowBook(false)}
      >
        <View style={styles.modalWrapper}>
          <BookAppointmentMain onClose={() => setShowBook(false)} />
        </View>
      </Modal>
    </ScreenSkeleton>
  );
}

const [showBook, setShowBook] = useState(false);


const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 16,
    marginBottom: 20,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
