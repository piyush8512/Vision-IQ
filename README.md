# Eye Heroes Global — Expo Router Navigation Guide

This project uses **Expo Router (Tabs template)**. Bottom tab navigation is already set up for you. You only need to:

1. Create a new screen file inside `app/(tabs)/`
2. Register that file inside `app/(tabs)/_layout.tsx`
3. Wrap the screen with the universal `ScreenSkeleton`

This README explains the exact steps.

---

## 1️⃣ Project Structure (Important)

```
app/
 ├─ (tabs)/
 │   ├─ _layout.tsx        ← Bottom tab configuration
 │   ├─ index.tsx          ← Home tab
 │   ├─ Dashboard.tsx      ← Dashboard tab
 │   ├─ Symptoms.tsx       ← Symptom tracking tab
 │   ├─ History.tsx        ← Family history tab
 │   ├─ Prep.tsx           ← Appointment prep tab
 │   ├─ Exams.tsx          ← Annual exam records tab
 │   ├─ DocFinder.tsx      ← Doctor finder tab
 │
components/
 ├─ layout/
 │   └─ ScreenSkeleton.tsx ← Universal screen wrapper
 ├─ ui/
 ├─ navigation/
```

---

## 2️⃣ Creating a New Tab Screen

### Step A — Create the screen file

Create a new file **inside `app/(tabs)/`**.

Example:

```
app/(tabs)/Dashboard.tsx
```

### Example Screen Code

```tsx
import { Text, View } from "react-native";
import { ScreenSkeleton } from "@/components/layout/ScreenSkeleton";

export default function DashboardScreen() {
  return (
    <ScreenSkeleton>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Dashboard</Text>
      </View>
    </ScreenSkeleton>
  );
}
```

✅ Every screen **must** use `ScreenSkeleton`

---

## 3️⃣ Registering the Screen in `_layout.tsx`

After creating the screen file, you must **add it to the Tabs layout**.

### Location

```
app/(tabs)/_layout.tsx
```

### Example `_layout.tsx`

```tsx
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="rectangle.grid.2x2.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Symptoms"
        options={{
          title: 'Symptoms Tracking',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="medical.thermometer" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="History"
        options={{
          title: 'Family & Health History',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="list.bullet.rectangle" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Prep"
        options={{
          title: 'Appointment Prep',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="checklist" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Exams"
        options={{
          title: 'Eye Exam Records',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="doc.text.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="DocFinder"
        options={{
          title: 'Doctor Finder',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="map.fill" color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
```

### ⚠️ Naming Rules (Very Important)

* `name="Dashboard"` **must match** `Dashboard.tsx`
* File names are **case-sensitive**
* No `.tsx` in the name field

---

## 4️⃣ Where to Put Components

### ✅ Correct Placement

| Type                    | Location                 |
| ----------------------- | ------------------------ |
| Screen pages            | `app/(tabs)/`            |
| Layout wrappers         | `components/layout/`     |
| Buttons, cards, sliders | `components/ui/`         |
| Navigation helpers      | `components/navigation/` |

❌ Do NOT put reusable components inside `app/`

---

## 5️⃣ Universal Rules (Team Standard)

* Every screen uses `ScreenSkeleton`
* Tabs are controlled **only** in `_layout.tsx`
* Screens contain **no business logic**
* Icons must include text labels (accessibility)
* No medical interpretation inside UI

---

## 6️⃣ Adding a New Tab (Checklist)

☐ Create file in `app/(tabs)/`
☐ Export default screen component
☐ Wrap with `ScreenSkeleton`
☐ Add `<Tabs.Screen />` entry
☐ Match file name exactly
☐ Add title + icon

---

This structure keeps the app scalable, accessible, and safe for minors while aligning with Eye Heroes Global design and non-diagnostic standards.
