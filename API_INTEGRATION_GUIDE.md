# 🚀 Eye Heroes Global - API Integration Guide

## Overview
This document maps all user data flows and identifies where Supabase backend API calls should be integrated into the Eye Heroes Global mobile app. Each section includes:
- **Data Being Sent** (CLIENT → SERVER)
- **Data Being Received** (SERVER → CLIENT)
- **Implementation Location** (File & Line Reference)

---

## 📋 Table of Contents
1. [Authentication Flow](#1-authentication-flow)
2. [User Profile Management](#2-user-profile-management)
3. [Symptoms & Health Tracking](#3-symptoms--health-tracking)
4. [Appointments](#4-appointments)
5. [Eye Exams Records](#5-eye-exams-records)
6. [Family Health History](#6-family-health-history)
7. [Doctor Finder](#7-doctor-finder)
8. [Dashboard & Home Screen](#8-dashboard--home-screen)

---

## 1. Authentication Flow

### 1.1 Sign Up
**File:** [app/signup.tsx](app/signup.tsx) & [components/signup-card.tsx](components/signup-card.tsx)

**Current State:**
- Form collects: Full Name, Email/Phone, Password
- On success: Routes to `/verify-email`

**🚩 API FLAG - Sign Up**
```typescript
// LOCATION: components/signup-card.tsx - handleCreateAccount function
// 📤 DATA BEING SENT:
{
  fullName: string;
  email: string;
  phone?: string;
  password: string;
}

// 📥 DATA BEING RECEIVED:
{
  userId: string;
  sessionToken: string;
  email: string;
  requiresEmailVerification: boolean;
}

// ACTION: Replace the navigation on button press with:
// await supabase.auth.signUp({ email, password })
// await supabase.from('users').insert({ fullName, email, phone })
```

### 1.2 Email Verification
**File:** [app/verify-email.tsx](app/verify-email.tsx) & [components/verify-email-card.tsx](components/verify-email-card.tsx)

**Current State:**
- Displays OTP input fields (6 digits)
- On success: Routes to `/profile-setup`

**🚩 API FLAG - Verify Email**
```typescript
// LOCATION: components/verify-email-card.tsx - handleVerify function
// 📤 DATA BEING SENT:
{
  email: string;
  otp: string;
}

// 📥 DATA BEING RECEIVED:
{
  success: boolean;
  userId: string;
  emailVerified: boolean;
}

// ACTION: Call Supabase email verification endpoint
// await supabase.auth.verifyOtp({ email, token: otp, type: 'email' })
```

### 1.3 Social Authentication (Google/Apple)
**File:** [components/signup-card.tsx](components/signup-card.tsx) - Lines 70-80

**Current State:**
- Buttons exist but have no onPress handlers
- Should redirect to OAuth flow

**🚩 API FLAG - OAuth Sign Up**
```typescript
// LOCATION: components/signup-card.tsx - Social buttons
// 📤 DATA BEING SENT:
{
  provider: "google" | "apple";
  idToken: string;
}

// 📥 DATA BEING RECEIVED:
{
  userId: string;
  sessionToken: string;
  user: {
    email: string;
    fullName?: string;
    avatarUrl?: string;
  }
}

// ACTION: Implement OAuth flow with Supabase
// Use: supabase.auth.signInWithOAuth({ provider })
```

---

## 2. User Profile Management

### 2.1 Profile Setup (Post Sign-Up)
**File:** [app/profile-setup.tsx](app/profile-setup.tsx) & [components/profile-setup-card.tsx](components/profile-setup-card.tsx)

**Current State:**
- Collects: Date of Birth, Last Exam Date, Gender, Vision Aids
- On success: Routes to `/eye-care-goals`

**🚩 API FLAG - Create User Profile**
```typescript
// LOCATION: components/profile-setup-card.tsx - handleNext function
// 📤 DATA BEING SENT:
{
  userId: string;
  dateOfBirth: Date;
  lastExamDate: Date;
  gender: "male" | "female" | "other";
  visionAids: "none" | "glasses" | "contacts" | "both";
  medicalConditions?: string[];
}

// 📥 DATA BEING RECEIVED:
{
  success: boolean;
  profileId: string;
}

// ACTION: Save to Supabase profiles table
// await supabase.from('profiles').insert({ userId, dateOfBirth, ... })
```

### 2.2 Profile View & Edit
**File:** [app/(tabs)/Profile.tsx](app/(tabs)/Profile.tsx)

**Current State:**
- Displays hardcoded user data:
  - Name: "Jane Doe"
  - Email: "jane@example.com"
  - Phone: "+1 (555) 123-4567"
  - Date of Birth: "January 15, 1990"
  - Member since: "Dec 2025"

**🚩 API FLAG - Fetch User Profile**
```typescript
// LOCATION: app/(tabs)/Profile.tsx - useEffect hook (on mount)
// 📤 DATA BEING SENT:
{
  userId: string; // from auth context
}

// 📥 DATA BEING RECEIVED:
{
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  memberSince: Date;
  profileImageUrl?: string;
}

// ACTION: Replace hardcoded values with API fetch
// const { data: profile } = await supabase.from('profiles').select('*').single()
```

### 2.3 Update Profile Picture
**File:** [app/(tabs)/Profile.tsx](app/(tabs)/Profile.tsx) - Camera button

**🚩 API FLAG - Upload Profile Picture**
```typescript
// LOCATION: Profile.tsx - cameraButton onPress handler
// 📤 DATA BEING SENT:
{
  userId: string;
  imageFile: File;
  mimeType: "image/jpeg" | "image/png";
}

// 📥 DATA BEING RECEIVED:
{
  success: boolean;
  profileImageUrl: string;
}

// ACTION: Upload to Supabase storage
// await supabase.storage.from('profile-pictures').upload(path, file)
// Update profile record with image URL
```

### 2.4 Settings Updates
**File:** [app/(tabs)/Profile.tsx](app/(tabs)/Profile.tsx) - OptionRow components

**Current State:**
- Notifications, Privacy & Security, Language & Region, Help & Support (no handlers)

**🚩 API FLAG - Update User Settings**
```typescript
// LOCATION: Profile.tsx - OptionRow onPress handlers
// 📤 DATA BEING SENT:
{
  userId: string;
  notificationsEnabled: boolean;
  privacyLevel: "public" | "private";
  language: string;
  region: string;
}

// 📥 DATA BEING RECEIVED:
{
  success: boolean;
  updatedSettings: object;
}

// ACTION: Save settings to Supabase
// await supabase.from('user_settings').update({ ... })
```

---

## 3. Symptoms & Health Tracking

### 3.1 Log Symptoms
**File:** [app/(tabs)/LogSymptomsMain.tsx](app/(tabs)/LogSymptomsMain.tsx)

**Current State:**
- Collects: Eye (Left/Right/Both), Symptoms (multi-select), Notes, Date (auto)
- On save: Logs to console, closes modal
- Symptoms tracked: Dryness, Irritation, Eye Strain, Blurred Vision, Light Sensitivity, Pain

**🚩 API FLAG - Create Symptom Log**
```typescript
// LOCATION: app/(tabs)/LogSymptomsMain.tsx - handleSave function
// 📤 DATA BEING SENT:
{
  userId: string;
  eye: "left" | "right" | "both";
  symptoms: string[]; // e.g., ["Dryness", "Irritation"]
  notes: string;
  timestamp: DateTime;
}

// 📥 DATA BEING RECEIVED:
{
  success: boolean;
  symptomLogId: string;
  savedAt: DateTime;
}

// ACTION: Insert into symptom_logs table
// Replace console.log() with:
// const { data } = await supabase.from('symptom_logs').insert({
//   user_id: userId, eye, symptoms, notes, timestamp: new Date()
// })
```

### 3.2 View Symptom History
**File:** [app/(tabs)/Symptoms.tsx](app/(tabs)/Symptoms.tsx)

**Current State:**
- Blank module - "Symptoms module (Blank)"

**🚩 API FLAG - Fetch Symptom History**
```typescript
// LOCATION: app/(tabs)/Symptoms.tsx - Initial data fetch
// 📤 DATA BEING SENT:
{
  userId: string;
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
}

// 📥 DATA BEING RECEIVED:
{
  symptomLogs: [
    {
      id: string;
      eye: string;
      symptoms: string[];
      notes: string;
      timestamp: DateTime;
    }
  ]
}

// ACTION: Implement screen with data from Supabase
// const { data: logs } = await supabase
//   .from('symptom_logs')
//   .select('*')
//   .eq('user_id', userId)
//   .order('timestamp', { ascending: false })
```

---

## 4. Appointments

### 4.1 Book Appointment
**File:** [app/(tabs)/book-appointment.tsx](app/(tabs)/book-appointment.tsx)

**Current State:**
- Collects: Appointment Type, Preferred Doctor, Date, Visit Type (In-Person/Virtual), Notes
- On submit: Logs to console, closes modal
- No existing appointments in system

**🚩 API FLAG - Create Appointment Booking**
```typescript
// LOCATION: app/(tabs)/book-appointment.tsx - handleSubmit function
// 📤 DATA BEING SENT:
{
  userId: string;
  appointmentType: string; // e.g., "Routine checkup", "Follow-up"
  preferredDoctorId: string;
  preferredDate: DateTime;
  visitType: "in-person" | "virtual";
  notes: string;
  status: "pending"; // Initial status
}

// 📥 DATA BEING RECEIVED:
{
  success: boolean;
  appointmentId: string;
  confirmationNumber: string;
  estimatedConfirmationTime: DateTime;
}

// ACTION: Insert into appointments table
// Replace console.log() with:
// const { data } = await supabase.from('appointments').insert({
//   user_id: userId, appointment_type: appointmentType,
//   doctor_id: doctorId, preferred_date: date, ...
// })
```

### 4.2 View Upcoming Appointments
**File:** [app/(tabs)/appointments.tsx](app/(tabs)/appointments.tsx)

**Current State:**
- Displays skeleton UI with hardcoded appointment placeholders
- Two tabs: "Upcoming" (active) and "Past"

**🚩 API FLAG - Fetch Upcoming Appointments**
```typescript
// LOCATION: app/(tabs)/appointments.tsx - useEffect hook
// 📤 DATA BEING SENT:
{
  userId: string;
  status: "upcoming" | "past";
  limit?: number;
}

// 📥 DATA BEING RECEIVED:
{
  appointments: [
    {
      id: string;
      appointmentType: string;
      doctorName: string;
      doctorId: string;
      dateTime: DateTime;
      location: string;
      visitType: string;
      status: "confirmed" | "pending" | "cancelled";
      meetingLink?: string; // for virtual
    }
  ]
}

// ACTION: Fetch from Supabase
// const { data: upcomingAppointments } = await supabase
//   .from('appointments')
//   .select('*, doctor:doctor_id(*)')
//   .eq('user_id', userId)
//   .gt('preferred_date', new Date())
//   .order('preferred_date')
```

### 4.3 View Past Appointments
**File:** [app/(tabs)/appointments-past.tsx](app/(tabs)/appointments-past.tsx)

**🚩 API FLAG - Fetch Past Appointments**
```typescript
// LOCATION: app/(tabs)/appointments-past.tsx - useEffect hook
// 📤 DATA BEING SENT:
{
  userId: string;
  status: "completed" | "cancelled";
}

// 📥 DATA BEING RECEIVED:
{
  appointments: [
    {
      id: string;
      appointmentType: string;
      doctorName: string;
      dateTime: DateTime;
      location: string;
      diagnosis?: string;
      prescriptionIssued?: boolean;
      notes?: string;
    }
  ]
}

// ACTION: Fetch completed appointments from Supabase
// const { data: pastAppointments } = await supabase
//   .from('appointments')
//   .select('*, doctor:doctor_id(*)')
//   .eq('user_id', userId)
//   .lt('preferred_date', new Date())
//   .order('preferred_date', { ascending: false })
```

### 4.4 Reschedule Appointment
**File:** [app/(tabs)/appointments.tsx](app/(tabs)/appointments.tsx) - Reschedule button

**🚩 API FLAG - Reschedule Appointment**
```typescript
// LOCATION: appointments.tsx - Reschedule button handler
// 📤 DATA BEING SENT:
{
  appointmentId: string;
  userId: string;
  newDate: DateTime;
  newTime: string;
  reason?: string;
}

// 📥 DATA BEING RECEIVED:
{
  success: boolean;
  appointmentId: string;
  newDateTime: DateTime;
}

// ACTION: Update appointment in Supabase
// await supabase.from('appointments')
//   .update({ preferred_date: newDate })
//   .eq('id', appointmentId)
```

### 4.5 Cancel Appointment
**File:** [app/(tabs)/appointments.tsx](app/(tabs)/appointments.tsx)

**🚩 API FLAG - Cancel Appointment**
```typescript
// LOCATION: appointments.tsx - Cancel handler
// 📤 DATA BEING SENT:
{
  appointmentId: string;
  userId: string;
  cancellationReason?: string;
}

// 📥 DATA BEING RECEIVED:
{
  success: boolean;
  appointmentId: string;
  status: "cancelled";
}

// ACTION: Update appointment status
// await supabase.from('appointments')
//   .update({ status: 'cancelled', cancellation_reason: reason })
//   .eq('id', appointmentId)
```

---

## 5. Eye Exams Records

### 5.1 View Exam Records
**File:** [app/(tabs)/Exams.tsx](app/(tabs)/Exams.tsx)

**Current State:**
- Blank module - "Annual eye exams record (Blank)"

**🚩 API FLAG - Fetch Eye Exam Records**
```typescript
// LOCATION: app/(tabs)/Exams.tsx - useEffect hook
// 📤 DATA BEING SENT:
{
  userId: string;
}

// 📥 DATA BEING RECEIVED:
{
  exams: [
    {
      id: string;
      examType: string; // "Annual", "Follow-up", etc.
      examDate: Date;
      doctorName: string;
      doctorId: string;
      clinic: string;
      visionPrescription?: {
        leftEye: string;
        rightEye: string;
      };
      diagnosis?: string;
      recommendations?: string[];
      documentUrl?: string; // PDF/image of exam report
      notes?: string;
    }
  ]
}

// ACTION: Fetch from Supabase
// const { data: exams } = await supabase
//   .from('eye_exams')
//   .select('*, doctor:doctor_id(*)')
//   .eq('user_id', userId)
//   .order('exam_date', { ascending: false })
```

### 5.2 Upload Exam Report
**File:** [app/(tabs)/Exams.tsx](app/(tabs)/Exams.tsx) - Upload button (to implement)

**🚩 API FLAG - Upload Exam Document**
```typescript
// LOCATION: Exams.tsx - Upload handler
// 📤 DATA BEING SENT:
{
  userId: string;
  examDate: Date;
  doctorName: string;
  clinic: string;
  document: File; // PDF/image
  visionPrescription?: object;
  diagnosis?: string;
}

// 📥 DATA BEING RECEIVED:
{
  success: boolean;
  examId: string;
  documentUrl: string;
}

// ACTION: Upload document and create exam record
// 1. Upload file to Supabase storage
// const { data: uploadedFile } = await supabase.storage
//   .from('exam-documents')
//   .upload(path, file)
// 2. Create exam record with document URL
// await supabase.from('eye_exams').insert({...})
```

---

## 6. Family Health History

### 6.1 View Family Health History
**File:** [app/(tabs)/familyHealthHistory.tsx](app/(tabs)/familyHealthHistory.tsx)

**Current State:**
- Displays hardcoded family members:
  - Mother: Glaucoma, Cataracts
  - Father: Diabetes
  - Sister: Myopia

**🚩 API FLAG - Fetch Family Health History**
```typescript
// LOCATION: app/(tabs)/familyHealthHistory.tsx - useEffect hook
// 📤 DATA BEING SENT:
{
  userId: string;
}

// 📥 DATA BEING RECEIVED:
{
  familyMembers: [
    {
      id: string;
      userId: string;
      name: string;
      relation: string; // "Parent", "Sibling", etc.
      conditions: string[]; // Eye conditions and other relevant conditions
      diagnosisAge?: number;
      notes?: string;
    }
  ]
}

// ACTION: Replace hardcoded data with API fetch
// const { data: familyHistory } = await supabase
//   .from('family_health_history')
//   .select('*')
//   .eq('user_id', userId)
```

### 6.2 Add Family Member
**File:** [app/(tabs)/familyHealthHistory.tsx](app/(tabs)/familyHealthHistory.tsx) - addFamilyMember function

**🚩 API FLAG - Create Family Member Record**
```typescript
// LOCATION: familyHealthHistory.tsx - addFamilyMember function
// 📤 DATA BEING SENT:
{
  userId: string;
  name: string;
  relation: string;
  conditions: string[];
  notes?: string;
}

// 📥 DATA BEING RECEIVED:
{
  success: boolean;
  memberId: string;
}

// ACTION: Insert into Supabase
// Replace state update with:
// const { data } = await supabase.from('family_health_history').insert({
//   user_id: userId, name, relation, conditions, notes
// })
```

### 6.3 Update Family Member
**File:** [app/(tabs)/familyHealthHistory.tsx](app/(tabs)/familyHealthHistory.tsx) - addCondition function

**🚩 API FLAG - Update Family Member Conditions**
```typescript
// LOCATION: familyHealthHistory.tsx - addCondition function
// 📤 DATA BEING SENT:
{
  memberId: string;
  userId: string;
  newCondition: string;
}

// 📥 DATA BEING RECEIVED:
{
  success: boolean;
  updatedMember: object;
}

// ACTION: Update family member record
// await supabase.from('family_health_history')
//   .update({ conditions: [...oldConditions, newCondition] })
//   .eq('id', memberId)
```

### 6.4 Delete Family Member
**File:** [app/(tabs)/familyHealthHistory.tsx](app/(tabs)/familyHealthHistory.tsx) - deleteFamilyMember function

**🚩 API FLAG - Delete Family Member**
```typescript
// LOCATION: familyHealthHistory.tsx - deleteFamilyMember function
// 📤 DATA BEING SENT:
{
  memberId: string;
  userId: string;
}

// 📥 DATA BEING RECEIVED:
{
  success: boolean;
}

// ACTION: Delete from Supabase
// await supabase.from('family_health_history')
//   .delete()
//   .eq('id', memberId)
//   .eq('user_id', userId)
```

---

## 7. Doctor Finder

### 7.1 Search Doctors
**File:** [app/(tabs)/DocFinder.tsx](app/(tabs)/DocFinder.tsx)

**Current State:**
- Blank module - "Doctor finder: uses Google Maps API (Blank)"
- Comment indicates Google Maps integration planned

**🚩 API FLAG - Search Doctors by Location**
```typescript
// LOCATION: app/(tabs)/DocFinder.tsx - Initial implementation
// 📤 DATA BEING SENT:
{
  userId: string;
  latitude: number;
  longitude: number;
  radius: number; // in miles/km
  specialization?: string; // "optometrist", "ophthalmologist"
  acceptsInsurance?: string;
  availableNow?: boolean;
}

// 📥 DATA BEING RECEIVED:
{
  doctors: [
    {
      id: string;
      name: string;
      specialization: string;
      clinicName: string;
      address: string;
      phone: string;
      website?: string;
      rating: number; // 1-5
      reviewCount: number;
      acceptedInsurances: string[];
      availableSlots: DateTime[];
      latitude: number;
      longitude: number;
      distance?: number; // from user location
    }
  ]
}

// ACTION: Integrate with Supabase + Google Maps API
// 1. Get user location
// 2. Query Supabase for doctors near location
// const { data: doctors } = await supabase.rpc('find_doctors_nearby', {
//   lat: latitude, lon: longitude, radius_km: radius
// })
// 3. Use Google Maps for distance/direction
```

### 7.2 View Doctor Details
**File:** [app/(tabs)/DocFinder.tsx](app/(tabs)/DocFinder.tsx) - Doctor detail screen (to implement)

**🚩 API FLAG - Fetch Doctor Details**
```typescript
// LOCATION: DocFinder.tsx - Doctor detail view
// 📤 DATA BEING SENT:
{
  doctorId: string;
}

// 📥 DATA BEING RECEIVED:
{
  doctor: {
    id: string;
    name: string;
    specialization: string;
    bio: string;
    clinicName: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
    qualifications: string[];
    yearsOfExperience: number;
    rating: number;
    reviews: [
      {
        userId: string;
        userName: string;
        rating: number;
        comment: string;
        date: Date;
      }
    ];
    acceptedInsurances: string[];
    availableSlots: DateTime[];
    servicesOffered: string[];
  }
}

// ACTION: Fetch doctor details from Supabase
// const { data: doctor } = await supabase
//   .from('doctors')
//   .select('*, reviews:doctor_reviews(*)')
//   .eq('id', doctorId)
//   .single()
```

### 7.3 Book Appointment with Doctor
**File:** Reuses [app/(tabs)/book-appointment.tsx](app/(tabs)/book-appointment.tsx)

**Note:** The existing book appointment flow should be enhanced to:
1. Auto-populate doctor name when coming from DocFinder
2. Show available time slots from doctor's schedule
3. Send appointment to doctor's system

**🚩 API FLAG - Enhanced Appointment Booking with Doctor Slot**
```typescript
// Location: book-appointment.tsx - Enhanced flow
// 📤 DATA BEING SENT:
{
  userId: string;
  doctorId: string;
  appointmentSlotId: string;
  appointmentType: string;
  visitType: "in-person" | "virtual";
  notes: string;
}

// 📥 DATA BEING RECEIVED:
{
  success: boolean;
  appointmentId: string;
  confirmationNumber: string;
  confirmationEmail: string;
  meetingLink?: string; // for virtual
}

// ACTION: Update appointment creation to use doctor's available slots
// Instead of free text date, use:
// const { data } = await supabase.from('appointments').insert({
//   user_id: userId, doctor_id: doctorId,
//   appointment_slot_id: slotId, ...
// })
```

---

## 8. Dashboard & Home Screen

### 8.1 Dashboard
**File:** [app/(tabs)/Dashboard.tsx](app/(tabs)/Dashboard.tsx)

**Current State:**
- Blank module - "Dashboard (Blank)"

**🚩 API FLAG - Fetch Dashboard Data**
```typescript
// LOCATION: app/(tabs)/Dashboard.tsx - Initial data fetch
// 📤 DATA BEING SENT:
{
  userId: string;
}

// 📥 DATA BEING RECEIVED:
{
  userStats: {
    appointmentsThisMonth: number;
    symptomsLoggedThisWeek: number;
    daysUntilNextExam: number;
    healthScore: number; // 0-100
  };
  upcomingAppointments: [{...}]; // Next 3
  recentSymptoms: [{...}]; // Last 5
  healthInsights: [{...}];
}

// ACTION: Design and implement dashboard
// Fetch user stats and display overview of health metrics
```

### 8.2 Home Screen / Daily Eye Check
**File:** [app/(tabs)/Home.tsx](app/(tabs)/Home.tsx)

**Current State:**
- Displays hardcoded data:
  - Greeting: "Jane"
  - Vision Trend: "Stable this month"
  - Screen Time: "6.5 hours today"
  - Upcoming: Annual Eye Exam (Dec 18, 2025)

**🚩 API FLAG - Fetch Home Screen Data**
```typescript
// LOCATION: app/(tabs)/Home.tsx - useEffect hook
// 📤 DATA BEING SENT:
{
  userId: string;
}

// 📥 DATA BEING RECEIVED:
{
  user: {
    firstName: string;
  };
  visionTrend: {
    status: "improving" | "stable" | "declining";
    description: string;
    changePercent: number;
    period: "month" | "quarter";
  };
  screenTime: {
    hoursToday: number;
    averageThisWeek: number;
    trend: "up" | "down" | "stable";
  };
  upcomingAppointments: [{...}]; // Next appointment
  dailyTips: [{
    id: string;
    title: string;
    description: string;
    category: string;
  }];
  recentExams: [{...}];
}

// ACTION: Replace hardcoded values with API data
// const { data: homeData } = await supabase.rpc('get_home_screen_data', {
//   user_id: userId
// })
```

### 8.3 Appointment Prep
**File:** [app/(tabs)/Prep.tsx](app/(tabs)/Prep.tsx) (Currently open)

**Current State:**
- Not reviewed yet - file is currently open in editor

**🚩 API FLAG - Fetch Appointment Prep Content**
```typescript
// LOCATION: app/(tabs)/Prep.tsx - useEffect hook
// 📤 DATA BEING SENT:
{
  userId: string;
  appointmentId?: string; // for specific appointment prep
}

// 📥 DATA BEING RECEIVED:
{
  prepGuide: {
    id: string;
    title: string;
    description: string;
    steps: [{
      step: number;
      title: string;
      description: string;
      icon: string;
    }];
    estimatedTime: number; // minutes
    uploadedDocuments?: string[];
  };
  questionnaire?: {
    id: string;
    questions: [{
      id: string;
      question: string;
      type: "text" | "select" | "multiselect";
      required: boolean;
      options?: string[];
    }];
  }
}

// ACTION: Load prep content from Supabase
// const { data: prepGuide } = await supabase
//   .from('appointment_prep_guides')
//   .select('*')
//   .eq('user_id', userId)
```

### 8.4 Save Appointment Prep Responses
**File:** [app/(tabs)/Prep.tsx](app/(tabs)/Prep.tsx)

**🚩 API FLAG - Save Prep Questionnaire Responses**
```typescript
// LOCATION: app/(tabs)/Prep.tsx - handleSubmit function
// 📤 DATA BEING SENT:
{
  userId: string;
  appointmentId: string;
  responses: {
    [questionId]: string | string[];
  };
  uploadedDocuments?: File[];
  submittedAt: DateTime;
}

// 📥 DATA BEING RECEIVED:
{
  success: boolean;
  prepId: string;
  status: "submitted";
}

// ACTION: Save prep responses to Supabase
// await supabase.from('appointment_prep_responses').insert({
//   user_id: userId, appointment_id: appointmentId, responses, ...
// })
```

---

## 9. Learn Tips & Education

### 9.1 View Eye Care Tips
**File:** [app/(tabs)/LearnTips.tsx](app/(tabs)/LearnTips.tsx) & [app/(tabs)/LearnTips2.tsx](app/(tabs)/LearnTips2.tsx)

**🚩 API FLAG - Fetch Educational Content**
```typescript
// LOCATION: app/(tabs)/LearnTips.tsx - useEffect hook
// 📤 DATA BEING SENT:
{
  userId: string;
  category?: string; // "prevention", "treatment", "daily-care"
  limit?: number;
}

// 📥 DATA BEING RECEIVED:
{
  tips: [
    {
      id: string;
      title: string;
      description: string;
      category: string;
      content: string; // HTML or markdown
      imageUrl?: string;
      author?: string;
      publishedDate: Date;
      readingTime: number; // minutes
    }
  ]
}

// ACTION: Fetch and display tips from Supabase
// const { data: tips } = await supabase
//   .from('educational_tips')
//   .select('*')
//   .order('published_date', { ascending: false })
```

---

## 10. Eye Care Goals

### 10.1 View & Set Eye Care Goals
**File:** [app/eye-care-goals.tsx](app/eye-care-goals.tsx)

**🚩 API FLAG - Fetch/Save Eye Care Goals**
```typescript
// LOCATION: app/eye-care-goals.tsx - Initial data fetch
// 📤 DATA BEING SENT:
{
  userId: string;
  goals?: [{
    id?: string;
    title: string;
    description: string;
    category: string; // "vision", "health", "lifestyle"
    targetDate?: Date;
  }];
}

// 📥 DATA BEING RECEIVED:
{
  goals: [{
    id: string;
    title: string;
    description: string;
    category: string;
    targetDate?: Date;
    progress: number; // 0-100
    status: "not-started" | "in-progress" | "completed";
    createdAt: Date;
  }]
}

// ACTION: Implement goal setting with Supabase
// Fetch: const { data: goals } = await supabase
//   .from('user_goals')
//   .select('*')
//   .eq('user_id', userId)
// Save: await supabase.from('user_goals').insert(newGoals)
```

---

## 11. Logout

### 11.1 User Logout
**File:** [app/(tabs)/Logout.tsx](app/(tabs)/Logout.tsx)

**🚩 API FLAG - End User Session**
```typescript
// LOCATION: app/(tabs)/Logout.tsx - handleLogout function
// 📤 DATA BEING SENT:
{
  userId: string;
  sessionToken: string;
}

// 📥 DATA BEING RECEIVED:
{
  success: boolean;
  message: string;
}

// ACTION: End user session
// await supabase.auth.signOut()
// Clear local storage/secure storage
// Redirect to login screen
```

---

## 🗄️ Recommended Supabase Table Structure

Based on the above flows, here are the essential tables to create:

```sql
-- Users (extends Supabase auth)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- User Profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date_of_birth DATE,
  gender TEXT,
  vision_aids TEXT,
  last_exam_date DATE,
  profile_image_url TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Symptom Logs
CREATE TABLE symptom_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  eye TEXT, -- left, right, both
  symptoms TEXT[], -- array
  notes TEXT,
  timestamp TIMESTAMP,
  created_at TIMESTAMP
);

-- Appointments
CREATE TABLE appointments (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  doctor_id UUID,
  appointment_type TEXT,
  preferred_date TIMESTAMP,
  visit_type TEXT, -- in-person, virtual
  status TEXT, -- pending, confirmed, cancelled
  notes TEXT,
  meeting_link TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Eye Exams
CREATE TABLE eye_exams (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  doctor_id UUID,
  exam_date DATE,
  exam_type TEXT,
  vision_prescription JSONB,
  diagnosis TEXT,
  recommendations TEXT[],
  document_url TEXT,
  notes TEXT,
  created_at TIMESTAMP
);

-- Family Health History
CREATE TABLE family_health_history (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name TEXT,
  relation TEXT,
  conditions TEXT[],
  diagnosis_age INT,
  notes TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Doctors
CREATE TABLE doctors (
  id UUID PRIMARY KEY,
  name TEXT,
  specialization TEXT,
  clinic_name TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  latitude FLOAT,
  longitude FLOAT,
  years_of_experience INT,
  qualifications TEXT[],
  accepted_insurances TEXT[],
  rating FLOAT,
  created_at TIMESTAMP
);

-- User Settings
CREATE TABLE user_settings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  notifications_enabled BOOLEAN,
  privacy_level TEXT,
  language TEXT,
  region TEXT,
  updated_at TIMESTAMP
);

-- Educational Content
CREATE TABLE educational_tips (
  id UUID PRIMARY KEY,
  title TEXT,
  description TEXT,
  category TEXT,
  content TEXT,
  image_url TEXT,
  author TEXT,
  published_date TIMESTAMP,
  reading_time INT
);

-- User Goals
CREATE TABLE user_goals (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title TEXT,
  description TEXT,
  category TEXT,
  target_date DATE,
  progress INT,
  status TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## 🔐 Security Considerations

1. **Row-Level Security (RLS):** Enable RLS on all tables to ensure users can only access their own data
2. **Authentication:** Use Supabase Auth for all API calls
3. **Rate Limiting:** Implement rate limiting on sensitive endpoints
4. **Data Validation:** Validate all input data on both client and server
5. **Encrypted Fields:** Encrypt sensitive data like medical information
6. **Audit Logging:** Track all data modifications for compliance

---

## 📋 Integration Checklist

- [ ] Install @supabase/supabase-js package
- [ ] Create .env file with Supabase credentials
- [ ] Create Supabase tables (see structure above)
- [ ] Implement authentication wrapper/context
- [ ] Add API utility functions
- [ ] Update signup flow
- [ ] Update profile management
- [ ] Update symptoms logging
- [ ] Update appointments flow
- [ ] Update exam records
- [ ] Update family history
- [ ] Implement doctor finder
- [ ] Implement home screen data fetching
- [ ] Add error handling and loading states
- [ ] Implement offline sync (optional)
- [ ] Add analytics tracking
- [ ] Implement security best practices

---

## 📞 Next Steps

1. Review all 🚩 API FLAG sections
2. Implement Supabase client initialization
3. Create context/provider for authentication state
4. Add custom hooks for data fetching (useUser, useAppointments, etc.)
5. Update each component with API calls
6. Add loading and error states
7. Implement real-time subscriptions for appointments/symptoms
8. Test end-to-end flows

