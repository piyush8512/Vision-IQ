import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { signUp } from "@/api/auth";

export default function SignupCard() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);


  async function handleSignUp() {
  if (!acceptedTerms) {
    alert("Please accept the Terms of Service.");
    return;
  }

  try {
    setLoading(true);

    await signUp({
      fullName,
      email,
      password,
    });

    alert("Account created successfully!");

    router.push("/verify-email");
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("Something went wrong.");
    }
  } finally {
    setLoading(false);
  }
}


  
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
        <View style={styles.progressItem} />
        <View style={styles.progressItem} />
        <View style={styles.progressItem} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.subtitle}>It takes less than a minute.</Text>

      {/* Full Name */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        placeholder="Jane Doe"
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      {/* Email / Phone */}
      <Text style={styles.label}>Email or Phone Number</Text>
      <TextInput
        placeholder="jane@example.com"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="••••••••"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {/* Terms */}
      <View style={styles.termsRow}>
        <TouchableOpacity
          style={[
            styles.checkbox,
            acceptedTerms && { backgroundColor: "#FF6A00" },
          ]}
          onPress={() => setAcceptedTerms((prev) => !prev)}
        />
        <Text style={styles.termsText}>
          I agree to the <Text style={styles.link}>Terms of Service</Text> and{" "}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>

      {/* Create Account */}
      <TouchableOpacity
  style={styles.button}
  onPress={handleSignUp}
  disabled={loading}
>
  <Text style={styles.buttonText}>
    {loading ? "Creating Account..." : "Create Account"}
  </Text>
</TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.orText}>Or continue with</Text>
        <View style={styles.divider} />
      </View>

      {/* Social */}
      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialButton}>
          <Text>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text>Apple</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>Your data is secure with us.</Text>
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
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
  },

  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    backgroundColor: "#fff",
  },

  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 4,
    marginRight: 10,
    marginTop: 2,
  },
  termsText: {
    fontSize: 12,
    color: "#6B7280",
    flex: 1,
  },
  link: {
    color: "#FF6A00",
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#FF6A00",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: "#9CA3AF",
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginHorizontal: 6,
    backgroundColor: "#fff",
  },

  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#9CA3AF",
  },
});
