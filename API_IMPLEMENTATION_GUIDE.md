# Eye Heroes Global - API Implementation Reference Guide

## Document Purpose
This document provides a structured, machine-readable reference for implementing Supabase API integrations in the Eye Heroes Global mobile application.

---

## Quick Reference: Finding Integration Points

All integration points are marked in source code with comments in this format:
```
// TODO-API: [ENDPOINT_ID]
// Request: { key: type, ... }
// Response: { key: type, ... }
```

### Search Command
To find all integration points in VS Code:
```
Ctrl+Shift+F (or Cmd+Shift+F on Mac)
Search for: "TODO-API:"
```

---

## Integration Endpoint Index

### Authentication Module (6 endpoints)
| Endpoint ID | File | Function | Status |
|---|---|---|---|
| SIGNUP_REQUEST | components/signup-card.tsx | handleCreateAccount | MARKED |
| OAUTH_SIGNUP | components/signup-card.tsx | socialButtons | MARKED |
| VERIFY_EMAIL_REQUEST | components/verify-email-card.tsx | handleVerify | PENDING |
| CREATE_PROFILE_REQUEST | components/profile-setup-card.tsx | handleNext | MARKED |
| LOGOUT_REQUEST | app/(tabs)/Logout.tsx | handleLogout | PENDING |

### User Profile Module (3 endpoints)
| Endpoint ID | File | Function | Status |
|---|---|---|---|
| FETCH_PROFILE_REQUEST | app/(tabs)/Profile.tsx | useEffect | MARKED |
| UPLOAD_PROFILE_PICTURE | app/(tabs)/Profile.tsx | cameraButton.onPress | MARKED |
| UPDATE_USER_SETTINGS | app/(tabs)/Profile.tsx | OptionRow handlers | PENDING |

### Symptoms & Health Tracking Module (2 endpoints)
| Endpoint ID | File | Function | Status |
|---|---|---|---|
| CREATE_SYMPTOM_LOG | app/(tabs)/LogSymptomsMain.tsx | handleSave | MARKED |
| FETCH_SYMPTOM_HISTORY | app/(tabs)/Symptoms.tsx | useEffect | MARKED |

### Appointments Module (5 endpoints)
| Endpoint ID | File | Function | Status |
|---|---|---|---|
| CREATE_APPOINTMENT | app/(tabs)/book-appointment.tsx | handleSubmit | MARKED |
| FETCH_UPCOMING_APPOINTMENTS | app/(tabs)/appointments.tsx | useEffect | MARKED |
| FETCH_PAST_APPOINTMENTS | app/(tabs)/appointments-past.tsx | useEffect | PENDING |
| RESCHEDULE_APPOINTMENT | app/(tabs)/appointments.tsx | rescheduleHandler | PENDING |
| CANCEL_APPOINTMENT | app/(tabs)/appointments.tsx | cancelHandler | PENDING |

### Eye Exams Module (2 endpoints)
| Endpoint ID | File | Function | Status |
|---|---|---|---|
| FETCH_EXAM_RECORDS | app/(tabs)/Exams.tsx | useEffect | MARKED |
| UPLOAD_EXAM_DOCUMENT | app/(tabs)/Exams.tsx | uploadHandler | PENDING |

### Family Health History Module (4 endpoints)
| Endpoint ID | File | Function | Status |
|---|---|---|---|
| FETCH_FAMILY_HISTORY | app/(tabs)/familyHealthHistory.tsx | useEffect | MARKED |
| CREATE_FAMILY_MEMBER | app/(tabs)/familyHealthHistory.tsx | addFamilyMember | MARKED |
| UPDATE_FAMILY_MEMBER | app/(tabs)/familyHealthHistory.tsx | addCondition | MARKED |
| DELETE_FAMILY_MEMBER | app/(tabs)/familyHealthHistory.tsx | deleteFamilyMember | MARKED |

### Doctor Finder Module (2 endpoints)
| Endpoint ID | File | Function | Status |
|---|---|---|---|
| SEARCH_DOCTORS | app/(tabs)/DocFinder.tsx | searchDoctors | MARKED |
| FETCH_DOCTOR_DETAILS | app/(tabs)/DocFinder.tsx | getDoctorDetails | MARKED |

### Home & Dashboard Module (4 endpoints)
| Endpoint ID | File | Function | Status |
|---|---|---|---|
| FETCH_HOME_DATA | app/(tabs)/Home.tsx | useEffect | MARKED |
| FETCH_DASHBOARD_DATA | app/(tabs)/Dashboard.tsx | useEffect | MARKED |
| FETCH_PREP_CONTENT | app/(tabs)/Prep.tsx | useEffect | PENDING |
| SAVE_PREP_RESPONSES | app/(tabs)/Prep.tsx | handleSubmit | PENDING |

### Learning Center Module (1 endpoint)
| Endpoint ID | File | Function | Status |
|---|---|---|---|
| FETCH_EDUCATIONAL_TIPS | app/(tabs)/LearnTips.tsx | useEffect | PENDING |

### User Goals Module (1 endpoint)
| Endpoint ID | File | Function | Status |
|---|---|---|---|
| FETCH_SAVE_GOALS | app/eye-care-goals.tsx | useEffect/handleSave | PENDING |

---

## Detailed Endpoint Specifications

### [1] SIGNUP_REQUEST
**Location:** [components/signup-card.tsx](components/signup-card.tsx)

**Function:** User account creation
```typescript
// REQUEST STRUCTURE
{
  fullName: string;           // Required, 2-100 characters
  email: string;              // Required, valid email format
  phone: string | null;       // Optional, E.164 format
  password: string;           // Required, min 8 characters
}

// RESPONSE STRUCTURE
{
  userId: string (UUID);          // User unique identifier
  sessionToken: string;            // JWT auth token
  email: string;                   // Confirmed email
  requiresEmailVerification: boolean; // Always true for email signup
}

// SUPABASE METHOD
supabase.auth.signUp({
  email: string,
  password: string
})

// POST-REQUEST ACTIONS
1. Create entry in users table with fullName, phone
2. Generate verification email
3. Store sessionToken in secure storage
4. Return response or redirect to /verify-email
```

---

### [2] OAUTH_SIGNUP
**Location:** [components/signup-card.tsx](components/signup-card.tsx)

**Function:** Social provider authentication
```typescript
// REQUEST STRUCTURE
{
  provider: "google" | "apple";  // OAuth provider
}

// RESPONSE STRUCTURE
{
  userId: string (UUID);
  sessionToken: string;
  user: {
    email: string;
    fullName: string | null;
    avatarUrl: string | null;
  }
}

// SUPABASE METHOD
supabase.auth.signInWithOAuth({
  provider: string
})

// POST-REQUEST ACTIONS
1. Authenticate with provider
2. Create/retrieve user in auth.users
3. If new user, create entry in users table
4. Store sessionToken
5. Redirect to profile setup
```

---

### [3] VERIFY_EMAIL_REQUEST
**Location:** [components/verify-email-card.tsx](components/verify-email-card.tsx)

**Function:** Validate email with OTP code
```typescript
// REQUEST STRUCTURE
{
  email: string;     // User's email address
  otp: string;       // 6-digit code from email
}

// RESPONSE STRUCTURE
{
  success: boolean;
  userId: string;
  emailVerified: boolean;  // Always true on success
}

// SUPABASE METHOD
supabase.auth.verifyOtp({
  email: string,
  token: string,      // OTP code
  type: "email"
})

// POST-REQUEST ACTIONS
1. Verify OTP with auth service
2. Mark email as verified
3. Return success
4. Redirect to /profile-setup
```

---

### [4] CREATE_PROFILE_REQUEST
**Location:** [components/profile-setup-card.tsx](components/profile-setup-card.tsx)

**Function:** Save initial user profile data
```typescript
// REQUEST STRUCTURE
{
  userId: string (UUID);                    // From auth context
  dateOfBirth: Date (YYYY-MM-DD);          // User's DOB
  lastExamDate: Date (YYYY-MM-DD);         // Last eye exam
  gender: "male" | "female" | "other";     // Gender identity
  visionAids: "none" | "glasses" | "contacts" | "both"; // Current aids
  medicalConditions: string[] | null;      // Optional health conditions
}

// RESPONSE STRUCTURE
{
  success: boolean;
  profileId: string (UUID);
}

// SUPABASE METHOD
supabase.from('profiles').insert([{
  user_id: string,
  date_of_birth: date,
  gender: string,
  vision_aids: string,
  last_exam_date: date,
  created_at: now(),
  updated_at: now()
}])

// POST-REQUEST ACTIONS
1. Insert new profile record
2. Set created_at and updated_at timestamps
3. Return profileId
4. Redirect to /eye-care-goals
```

---

### [5] FETCH_PROFILE_REQUEST
**Location:** [app/(tabs)/Profile.tsx](app/(tabs)/Profile.tsx)

**Function:** Load user profile data for display
```typescript
// REQUEST STRUCTURE
{
  userId: string (UUID);  // From auth.user.id
}

// RESPONSE STRUCTURE
{
  name: string;                    // User's full name
  email: string;                   // User's email
  phone: string | null;            // User's phone
  dateOfBirth: Date;               // User's date of birth
  memberSince: Date;               // Account creation date
  profileImageUrl: string | null;  // Profile picture URL
}

// SUPABASE METHOD
const { data: profile } = await supabase
  .from('profiles')
  .select('*, user:users(full_name, email, phone)')
  .eq('user_id', userId)
  .single()

// POST-REQUEST ACTIONS
1. Fetch from profiles table joined with users table
2. Map to response structure
3. Display in Profile.tsx component
4. Cache locally if needed
```

---

### [6] UPLOAD_PROFILE_PICTURE
**Location:** [app/(tabs)/Profile.tsx](app/(tabs)/Profile.tsx)

**Function:** Upload and store profile image
```typescript
// REQUEST STRUCTURE
{
  userId: string (UUID);
  imageFile: File;                          // Binary image data
  mimeType: "image/jpeg" | "image/png";    // File type
}

// RESPONSE STRUCTURE
{
  success: boolean;
  profileImageUrl: string;  // Public or signed URL
}

// SUPABASE METHOD (Two-step)
// 1. Upload file to storage
const { data, error } = await supabase.storage
  .from('profile-pictures')
  .upload(`${userId}/profile.jpg`, imageFile, {
    upsert: true,
    contentType: mimeType
  })

// 2. Update profile record
await supabase.from('profiles')
  .update({ profile_image_url: publicUrl })
  .eq('user_id', userId)

// POST-REQUEST ACTIONS
1. Validate image (size, format)
2. Upload to Supabase Storage bucket
3. Get public URL
4. Update profiles.profile_image_url
5. Return URL to component
6. Update UI with new image
```

---

### [7] CREATE_SYMPTOM_LOG
**Location:** [app/(tabs)/LogSymptomsMain.tsx](app/(tabs)/LogSymptomsMain.tsx)

**Function:** Save symptom report entry
```typescript
// REQUEST STRUCTURE
{
  userId: string (UUID);
  eye: "left" | "right" | "both";
  symptoms: string[];  // e.g., ["Dryness", "Irritation"]
  notes: string;       // User's description
  timestamp: DateTime; // When symptoms occurred
}

// RESPONSE STRUCTURE
{
  success: boolean;
  symptomLogId: string (UUID);
  savedAt: DateTime;
}

// SUPABASE METHOD
await supabase.from('symptom_logs').insert([{
  user_id: userId,
  eye: eye,
  symptoms: symptoms,  // TEXT[] array type
  notes: notes,
  timestamp: timestamp,
  created_at: now()
}])

// POST-REQUEST ACTIONS
1. Insert new symptom log
2. Validate symptom data
3. Set timestamp to now() or user-provided time
4. Return symptomLogId
5. Show success message
6. Close modal and refresh home screen
```

---

### [8] FETCH_SYMPTOM_HISTORY
**Location:** [app/(tabs)/Symptoms.tsx](app/(tabs)/Symptoms.tsx)

**Function:** Display user's symptom tracking history
```typescript
// REQUEST STRUCTURE
{
  userId: string (UUID);
  dateRange: {
    startDate: Date | null;  // Optional filter start
    endDate: Date | null;    // Optional filter end
  }
}

// RESPONSE STRUCTURE
{
  symptomLogs: [
    {
      id: string (UUID);
      eye: string;
      symptoms: string[];
      notes: string;
      timestamp: DateTime;
    }
  ]
}

// SUPABASE METHOD
const { data: logs } = await supabase
  .from('symptom_logs')
  .select('*')
  .eq('user_id', userId)
  .gte('timestamp', startDate)  // If filtering
  .lte('timestamp', endDate)    // If filtering
  .order('timestamp', { ascending: false })

// POST-REQUEST ACTIONS
1. Fetch symptom logs ordered by most recent
2. Apply date filters if provided
3. Format response data
4. Display in Symptoms.tsx component
5. Implement real-time subscription (optional)
```

---

### [9] CREATE_APPOINTMENT
**Location:** [app/(tabs)/book-appointment.tsx](app/(tabs)/book-appointment.tsx)

**Function:** Schedule new appointment request
```typescript
// REQUEST STRUCTURE
{
  userId: string (UUID);
  appointmentType: string;           // e.g., "Routine checkup"
  preferredDoctorId: string (UUID);  // Doctor to book with
  preferredDate: DateTime;           // Requested appointment time
  visitType: "in-person" | "virtual"; // Appointment type
  notes: string;                      // Additional notes
}

// RESPONSE STRUCTURE
{
  success: boolean;
  appointmentId: string (UUID);
  confirmationNumber: string;
  estimatedConfirmationTime: DateTime;
}

// SUPABASE METHOD
const { data } = await supabase.from('appointments').insert([{
  user_id: userId,
  doctor_id: preferredDoctorId,
  appointment_type: appointmentType,
  preferred_date: preferredDate,
  visit_type: visitType,
  notes: notes,
  status: 'pending',
  created_at: now(),
  updated_at: now()
}])

// POST-REQUEST ACTIONS
1. Insert appointment record with status='pending'
2. Generate confirmation number
3. Send confirmation email to user
4. Optionally notify doctor
5. Return appointmentId and confirmation details
6. Display confirmation to user
7. Close modal and refresh appointments list
```

---

### [10] FETCH_UPCOMING_APPOINTMENTS
**Location:** [app/(tabs)/appointments.tsx](app/(tabs)/appointments.tsx)

**Function:** Display upcoming scheduled appointments
```typescript
// REQUEST STRUCTURE
{
  userId: string (UUID);
  status: "upcoming";  // Filter type
  limit: number;       // Max results (e.g., 10)
}

// RESPONSE STRUCTURE
{
  appointments: [
    {
      id: string (UUID);
      appointmentType: string;
      doctorName: string;
      doctorId: string (UUID);
      dateTime: DateTime;
      location: string;
      visitType: string;
      status: "confirmed" | "pending" | "cancelled";
      meetingLink: string | null;  // For virtual appointments
    }
  ]
}

// SUPABASE METHOD
const { data: appointments } = await supabase
  .from('appointments')
  .select('*, doctor:doctors(name, address)')
  .eq('user_id', userId)
  .gt('preferred_date', now())
  .in('status', ['pending', 'confirmed'])
  .order('preferred_date', { ascending: true })
  .limit(limit)

// POST-REQUEST ACTIONS
1. Fetch future appointments with doctor details
2. Filter out cancelled appointments
3. Sort by appointment date (earliest first)
4. Format response data
5. Display in appointments.tsx component
```

---

### [11] FETCH_EXAM_RECORDS
**Location:** [app/(tabs)/Exams.tsx](app/(tabs)/Exams.tsx)

**Function:** Display user's eye exam history
```typescript
// REQUEST STRUCTURE
{
  userId: string (UUID);
}

// RESPONSE STRUCTURE
{
  exams: [
    {
      id: string (UUID);
      examType: string;           // "Annual", "Follow-up", etc.
      examDate: Date;
      doctorName: string;
      doctorId: string (UUID);
      clinic: string;
      visionPrescription: {
        leftEye: string;
        rightEye: string;
      } | null;
      diagnosis: string | null;
      recommendations: string[] | null;
      documentUrl: string | null;  // PDF/image URL
      notes: string | null;
    }
  ]
}

// SUPABASE METHOD
const { data: exams } = await supabase
  .from('eye_exams')
  .select('*, doctor:doctors(name)')
  .eq('user_id', userId)
  .order('exam_date', { ascending: false })

// POST-REQUEST ACTIONS
1. Fetch all eye exam records for user
2. Join with doctor information
3. Sort by most recent first
4. Format response
5. Display in Exams.tsx component
```

---

### [12] FETCH_FAMILY_HISTORY
**Location:** [app/(tabs)/familyHealthHistory.tsx](app/(tabs)/familyHealthHistory.tsx)

**Function:** Display family health history
```typescript
// REQUEST STRUCTURE
{
  userId: string (UUID);
}

// RESPONSE STRUCTURE
{
  familyMembers: [
    {
      id: string (UUID);
      userId: string (UUID);
      name: string;
      relation: string;              // "Parent", "Sibling", etc.
      conditions: string[];          // Eye and other conditions
      diagnosisAge: number | null;   // Age diagnosed
      notes: string | null;
    }
  ]
}

// SUPABASE METHOD
const { data: familyHistory } = await supabase
  .from('family_health_history')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })

// POST-REQUEST ACTIONS
1. Fetch all family member records
2. Format response data
3. Display in familyHealthHistory.tsx component
4. Allow for editing/deleting members
```

---

### [13] CREATE_FAMILY_MEMBER
**Location:** [app/(tabs)/familyHealthHistory.tsx](app/(tabs)/familyHealthHistory.tsx)

**Function:** Add new family member to history
```typescript
// REQUEST STRUCTURE
{
  userId: string (UUID);
  name: string;
  relation: string;       // "Parent", "Sibling", "Grandparent", etc.
  conditions: string[];   // Initial conditions list
  notes: string | null;
}

// RESPONSE STRUCTURE
{
  success: boolean;
  memberId: string (UUID);
}

// SUPABASE METHOD
const { data } = await supabase.from('family_health_history').insert([{
  user_id: userId,
  name: name,
  relation: relation,
  conditions: conditions,
  notes: notes,
  created_at: now(),
  updated_at: now()
}])

// POST-REQUEST ACTIONS
1. Insert new family member record
2. Validate relation type
3. Return memberId
4. Close modal and refresh family history list
```

---

### [14] UPDATE_FAMILY_MEMBER
**Location:** [app/(tabs)/familyHealthHistory.tsx](app/(tabs)/familyHealthHistory.tsx)

**Function:** Add condition to family member
```typescript
// REQUEST STRUCTURE
{
  memberId: string (UUID);
  userId: string (UUID);
  newCondition: string;
}

// RESPONSE STRUCTURE
{
  success: boolean;
  updatedMember: object;  // Updated member record
}

// SUPABASE METHOD
const { data } = await supabase
  .from('family_health_history')
  .select('conditions')
  .eq('id', memberId)
  .eq('user_id', userId)
  .single()

// Then update with new conditions array
await supabase.from('family_health_history')
  .update({
    conditions: [...currentConditions, newCondition],
    updated_at: now()
  })
  .eq('id', memberId)
  .eq('user_id', userId)

// POST-REQUEST ACTIONS
1. Fetch current conditions
2. Add new condition to array
3. Update member record
4. Return success
5. Refresh UI
```

---

### [15] DELETE_FAMILY_MEMBER
**Location:** [app/(tabs)/familyHealthHistory.tsx](app/(tabs)/familyHealthHistory.tsx)

**Function:** Remove family member record
```typescript
// REQUEST STRUCTURE
{
  memberId: string (UUID);
  userId: string (UUID);
}

// RESPONSE STRUCTURE
{
  success: boolean;
}

// SUPABASE METHOD
await supabase.from('family_health_history')
  .delete()
  .eq('id', memberId)
  .eq('user_id', userId)

// POST-REQUEST ACTIONS
1. Delete family member record
2. Ensure user_id matches for security
3. Return success
4. Refresh family history list
5. Show confirmation
```

---

### [16] SEARCH_DOCTORS
**Location:** [app/(tabs)/DocFinder.tsx](app/(tabs)/DocFinder.tsx)

**Function:** Find doctors by location and specialty
```typescript
// REQUEST STRUCTURE
{
  userId: string (UUID);
  latitude: number;                           // User's latitude
  longitude: number;                          // User's longitude
  radius: number;                             // Search radius (km)
  specialization: string | null;              // "optometrist", "ophthalmologist"
  acceptsInsurance: string | null;            // Insurance provider
  availableNow: boolean | null;               // Available same-day
}

// RESPONSE STRUCTURE
{
  doctors: [
    {
      id: string (UUID);
      name: string;
      specialization: string;
      clinicName: string;
      address: string;
      phone: string;
      website: string | null;
      rating: number (1-5);
      reviewCount: number;
      acceptedInsurances: string[];
      availableSlots: DateTime[];
      latitude: number;
      longitude: number;
      distance: number (km) | null;  // Calculated distance
    }
  ]
}

// SUPABASE METHOD (RPC FUNCTION)
const { data: doctors } = await supabase.rpc('find_doctors_nearby', {
  lat: latitude,
  lon: longitude,
  radius_km: radius,
  spec: specialization
})

// POST-REQUEST ACTIONS
1. Get user's location (GPS or provided)
2. Call stored procedure to find nearby doctors
3. Calculate distances using PostGIS
4. Filter by specialization if provided
5. Filter by insurance if provided
6. Sort by distance/rating
7. Return results to DocFinder.tsx
8. Display doctor list with map
```

---

### [17] FETCH_HOME_DATA
**Location:** [app/(tabs)/Home.tsx](app/(tabs)/Home.tsx)

**Function:** Load all home screen data
```typescript
// REQUEST STRUCTURE
{
  userId: string (UUID);
}

// RESPONSE STRUCTURE
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
  upcomingAppointments: object[];  // Next appointment
  dailyTips: [
    {
      id: string;
      title: string;
      description: string;
      category: string;
    }
  ];
  recentExams: object[];
}

// SUPABASE METHOD (RPC FUNCTION)
const { data: homeData } = await supabase.rpc('get_home_screen_data', {
  user_id: userId
})

// POST-REQUEST ACTIONS
1. Call stored procedure to aggregate home data
2. Calculate vision trend from symptom logs
3. Get screen time data
4. Fetch next upcoming appointment
5. Get daily tip
6. Fetch recent exams
7. Return all data
8. Display in Home.tsx component
```

---

### [18] FETCH_DASHBOARD_DATA
**Location:** [app/(tabs)/Dashboard.tsx](app/(tabs)/Dashboard.tsx)

**Function:** Load dashboard overview data
```typescript
// REQUEST STRUCTURE
{
  userId: string (UUID);
}

// RESPONSE STRUCTURE
{
  userStats: {
    appointmentsThisMonth: number;
    symptomsLoggedThisWeek: number;
    daysUntilNextExam: number;
    healthScore: number (0-100);  // Calculated metric
  };
  upcomingAppointments: object[];   // Next 3
  recentSymptoms: object[];          // Last 5
  healthInsights: object[];
}

// SUPABASE METHOD (RPC FUNCTION)
const { data: dashboardData } = await supabase.rpc('get_dashboard_data', {
  user_id: userId
})

// POST-REQUEST ACTIONS
1. Call stored procedure for aggregated stats
2. Count appointments this month
3. Count symptoms logged this week
4. Calculate days until next eye exam
5. Calculate health score
6. Fetch next 3 appointments
7. Fetch last 5 symptom logs
8. Generate health insights
9. Return all data
10. Display in Dashboard.tsx component
```

---

## Supabase Storage Buckets

```
profile-pictures/
  ├── {userId}/profile.jpg         // Profile pictures
  └── ...

exam-documents/
  ├── {userId}/{examId}/report.pdf // Exam PDFs
  └── ...

appointment-files/
  ├── {userId}/{appointmentId}/... // Appointment-related docs
  └── ...
```

---

## Row-Level Security (RLS) Policies

All tables require RLS enabled with policies:

```sql
-- Example for profiles table
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = user_id);

-- Similar policies for all other user-owned tables
```

---

## Error Handling Standards

All endpoints should handle:
- Network errors (offline mode)
- Authentication errors (session expired)
- Validation errors (invalid input)
- Rate limiting (too many requests)
- Server errors (5xx responses)

Example response envelope:
```typescript
{
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: object;
  };
  timestamp: DateTime;
}
```

---

## Testing Checklist

For each endpoint implementation:
- [ ] Request validation (schema check)
- [ ] Authentication verification (user logged in)
- [ ] Authorization check (user owns resource)
- [ ] Database transaction integrity
- [ ] Error handling (all edge cases)
- [ ] Response formatting
- [ ] Loading states in UI
- [ ] Success/error notifications
- [ ] Real data vs mock data testing
- [ ] Network offline handling

---

## Performance Considerations

1. **Caching:** Implement local caching for frequently accessed data
2. **Pagination:** Use limit/offset for large result sets
3. **Real-time:** Use Supabase subscriptions for live updates
4. **Debouncing:** Debounce search and filter operations
5. **Lazy Loading:** Load data on demand, not all at once

---

## Security Best Practices

1. **Never expose API keys** in client-side code
2. **Use RLS** on all tables to enforce user isolation
3. **Validate input** on both client and server
4. **Hash sensitive data** (passwords, tokens)
5. **Use HTTPS** for all requests
6. **Implement CORS** properly
7. **Rate limit** API endpoints
8. **Log access** for audit trails

---

## Development Workflow

1. **Find TODO-API marker** using search
2. **Review endpoint specification** above
3. **Implement request validation**
4. **Call Supabase method** from specification
5. **Handle response** according to spec
6. **Add error handling**
7. **Update UI** with loading/success/error states
8. **Test with real data**
9. **Remove TODO-API marker** when complete
10. **Commit with clear message**

---

## Support & Debugging

### Common Issues

**Issue:** 400 Bad Request
- Check request structure matches specification
- Validate data types (string vs number vs boolean)
- Ensure required fields are provided

**Issue:** 401 Unauthorized
- Verify user is authenticated
- Check session token is valid
- Ensure token is passed in Authorization header

**Issue:** 403 Forbidden
- Verify RLS policies allow operation
- Check user_id matches authenticated user
- Ensure user has necessary permissions

**Issue:** 404 Not Found
- Verify resource ID is correct
- Check resource hasn't been deleted
- Ensure resource belongs to authenticated user

**Issue:** 429 Too Many Requests
- Implement exponential backoff retry
- Add debouncing to client requests
- Consider rate limiting strategy

---

## Status Tracking

**MARKED:** Integration point flagged in source code (16 endpoints)
**PENDING:** Needs flagging in source code (10 endpoints)

Total endpoints: 26 API integration points

Progress: 16/26 marked (61%)
