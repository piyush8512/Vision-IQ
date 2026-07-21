export const examDoctorRecord = {
  id: "4988d069-b394-4359-bf6a-74d4d34aeb8f",

  appointment_id: "4988d069-b394-4359-bf6a-74d4d34aeb8f",

  doctor_id: "4988d069-b394-4359-bf6a-74d4d34aeb8f",

  diagnosis:
    "Mild Digital Eye Strain (Computer Vision Syndrome) with early Myopia progression.",

  vision_measurements: {
    right_eye: {
      sphere: "-1.50",
      cylinder: "-0.50",
      axis: 180,
      visual_acuity: "20/20",
      iop: "15 mmHg",
    },

    left_eye: {
      sphere: "-1.75",
      cylinder: "-0.25",
      axis: 175,
      visual_acuity: "20/20",
      iop: "14 mmHg",
    },
  },

  clinical_findings: [
    "Normal retinal examination.",
    "Mild tear film instability.",
    "No signs of glaucoma.",
    "No diabetic retinopathy.",
    "Healthy optic nerve.",
    "Slight dryness observed in both eyes.",
  ],

  recommendations: [
    "Follow the 20-20-20 rule.",
    "Use preservative-free artificial tears twice daily.",
    "Reduce continuous screen time.",
    "Increase blinking frequency.",
    "Ensure proper monitor height.",
    "Maintain room lighting while working.",
    "Wear anti-reflective coated lenses.",
  ],

  prescription_changes: [
    "Updated distance prescription.",
    "Blue-light coating recommended.",
    "Anti-glare coating added.",
  ],

  follow_up: "Schedule another eye examination after 12 months.",

  created_at: "2026-08-12T11:15:00Z",
  updated_at: "2026-08-12T11:15:00Z",
};

export const examUserRecord = {
  id: "4988d069-b394-4359-bf6a-74d4d34aeb8f",
  user_id: "4988d069-b394-4359-bf6a-74d4d34aeb8f",
  provider_name: "Dr. Sarah Johnson",
  appointment_date: "2026-08-12T10:30:00Z",
  place: "Vision Care Center",
  notes: "Annual comprehensive eye examination",

  user_notes: [
    {
      id: "1",
      type: "Symptom",
      content: "Dry eyes after 4-5 hours of screen time.",
      created_at: "2026-08-01T09:00:00Z",
      updated_at: "2026-08-01T09:00:00Z",
    },
    {
      id: "2",
      type: "Symptom",
      content: "Blurred vision while driving at night.",
      created_at: "2026-08-01T09:05:00Z",
      updated_at: "2026-08-01T09:05:00Z",
    },
    {
      id: "3",
      type: "Symptom",
      content: "Occasional headaches after long coding sessions.",
      created_at: "2026-08-01T09:10:00Z",
      updated_at: "2026-08-01T09:10:00Z",
    },

    {
      id: "4",
      type: "Concern",
      content: "Concerned that prolonged laptop usage is affecting eyesight.",
      created_at: "2026-08-01T09:15:00Z",
      updated_at: "2026-08-01T09:15:00Z",
    },
    {
      id: "5",
      type: "Concern",
      content: "Family history of glaucoma.",
      created_at: "2026-08-01T09:20:00Z",
      updated_at: "2026-08-01T09:20:00Z",
    },

    {
      id: "6",
      type: "Question",
      content: "Should I wear blue-light glasses?",
      created_at: "2026-08-01T09:25:00Z",
      updated_at: "2026-08-01T09:25:00Z",
    },
    {
      id: "7",
      type: "Question",
      content: "How often should I get an eye examination?",
      created_at: "2026-08-01T09:30:00Z",
      updated_at: "2026-08-01T09:30:00Z",
    },
    {
      id: "8",
      type: "Question",
      content: "Are eye exercises actually useful?",
      created_at: "2026-08-01T09:35:00Z",
      updated_at: "2026-08-01T09:35:00Z",
    },

    {
      id: "9",
      type: "Reminder",
      content: "Bring current prescription glasses.",
      created_at: "2026-08-01T09:40:00Z",
      updated_at: "2026-08-01T09:40:00Z",
    },
    {
      id: "10",
      type: "Note",
      content: "Recently switched to a larger monitor for work.",
      created_at: "2026-08-01T09:45:00Z",
      updated_at: "2026-08-01T09:45:00Z",
    },
  ],

  doctor_questions: [
    "How many hours do you use screens daily?",
    "Do you experience headaches while reading?",
    "Is there any family history of eye disease?",
  ],

  created_at: "2026-08-01T09:00:00Z",
  updated_at: "2026-08-01T09:45:00Z",
};