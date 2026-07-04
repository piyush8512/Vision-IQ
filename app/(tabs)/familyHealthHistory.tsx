import { ScreenSkeleton } from "@/components/layouts/ScreenSkeleton";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function FamilyHealthHistory() {
  // TODO-API: FETCH_FAMILY_HISTORY
  // Request: { userId }
  // Response: { familyMembers[] with id, userId, name, relation, conditions[], diagnosisAge, notes }
  
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      name: "Mother",
      relation: "Parent",
      conditions: ["Glaucoma", "Cataracts"],
      notes: "Diagnosed with glaucoma at age 55",
    },
    {
      id: 2,
      name: "Father",
      relation: "Parent",
      conditions: ["Diabetes"],
      notes: "",
    },
    {
      id: 3,
      name: "Sister",
      relation: "Sibling",
      conditions: ["Myopia"],
      notes: "",
    },
  ]);

  /* ---------- Add Family Member ---------- */
  const [showAddMember, setShowAddMember] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberRelation, setMemberRelation] = useState("");

  /* ---------- Add Condition ---------- */
  const [showAddCondition, setShowAddCondition] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [conditionText, setConditionText] = useState("");

  /* ---------- Delete Member ---------- */
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const addFamilyMember = () => {
    if (!memberName.trim() || !memberRelation.trim()) return;

    // TODO-API: CREATE_FAMILY_MEMBER
    // Request: { userId, name, relation, conditions[], notes }
    // Response: { success, memberId }

    setFamilyMembers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: memberName,
        relation: memberRelation,
        conditions: [],
        notes: "",
      },
    ]);

    setMemberName("");
    setMemberRelation("");
    setShowAddMember(false);
  };

  const addCondition = () => {
    if (!conditionText.trim() || selectedMemberId === null) return;

    // TODO-API: UPDATE_FAMILY_MEMBER
    // Request: { memberId, userId, newCondition }
    // Response: { success, updatedMember }

    setFamilyMembers((prev) =>
      prev.map((member) =>
        member.id === selectedMemberId
          ? {
              ...member,
              conditions: [...member.conditions, conditionText],
            }
          : member
      )
    );

    setConditionText("");
    setShowAddCondition(false);
  };

  const deleteFamilyMember = () => {
    if (memberToDelete === null) return;

    // TODO-API: DELETE_FAMILY_MEMBER
    // Request: { memberId, userId }
    // Response: { success }
    setFamilyMembers((prev) =>
      prev.filter((member) => member.id !== memberToDelete)
    );

    setExpandedId(null);
    setMemberToDelete(null);
    setShowDeleteConfirm(false);
  };

  return (
    <ScreenSkeleton>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="people-outline" size={20} color="#fff" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.infoTitle}>Why track family history?</Text>
            <Text style={styles.infoText}>
              Many eye conditions are hereditary. Knowing your family history
              helps your doctor assess risk and plan preventive care.
            </Text>
          </View>
        </View>

        {/* Add Family Member */}
        <TouchableOpacity
          style={styles.addMember}
          onPress={() => setShowAddMember(true)}
        >
          <Ionicons name="add" size={18} color="#2563EB" />
          <Text style={styles.addMemberText}>Add Family Member</Text>
        </TouchableOpacity>

        {/* Family Members */}
        {familyMembers.map((member) => {
          const isExpanded = expandedId === member.id;

          return (
            <TouchableOpacity
              key={member.id}
              style={styles.memberCard}
              activeOpacity={1}
              onLongPress={() => {
                setMemberToDelete(member.id);
                setShowDeleteConfirm(true);
              }}
            >
              <TouchableOpacity
                style={styles.memberHeader}
                onPress={() => toggleExpand(member.id)}
                activeOpacity={0.7}
              >
                <View>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRelation}>{member.relation}</Text>
                </View>

                <View style={styles.rightSection}>
                  <View style={styles.conditionBadge}>
                    <Text style={styles.badgeText}>
                      {member.conditions.length} conditions
                    </Text>
                  </View>
                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#6B7280"
                  />
                </View>
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.expandedArea}>
                  <Text style={styles.sectionTitle}>Eye Conditions</Text>

                  <View style={styles.conditionRow}>
                    {member.conditions.map((cond, index) => (
                      <View key={index} style={styles.conditionChip}>
                        <Text style={styles.chipText}>{cond}</Text>
                      </View>
                    ))}
                  </View>

                  {member.notes ? (
                    <Text style={styles.notes}>Notes: {member.notes}</Text>
                  ) : null}

                  <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.detailBtn}>
                      <Text style={styles.detailText}>Edit Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.addConditionBtn}
                      onPress={() => {
                        setSelectedMemberId(member.id);
                        setShowAddCondition(true);
                      }}
                    >
                      <Text style={styles.addConditionText}>Add Condition</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity style={styles.shareBtn}>
          <Text style={styles.shareText}>Share with Doctor</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Family Member Modal */}
      <Modal transparent visible={showAddMember} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TextInput
              placeholder="Name"
              value={memberName}
              onChangeText={setMemberName}
              style={styles.input}
            />
            <TextInput
              placeholder="Relation"
              value={memberRelation}
              onChangeText={setMemberRelation}
              style={styles.input}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setShowAddMember(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addFamilyMember}>
                <Text style={styles.confirmText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Condition Modal */}
      <Modal transparent visible={showAddCondition} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TextInput
              placeholder="Condition name"
              value={conditionText}
              onChangeText={setConditionText}
              style={styles.input}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setShowAddCondition(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addCondition}>
                <Text style={styles.confirmText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal transparent visible={showDeleteConfirm} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={{ fontWeight: "600", marginBottom: 8 }}>
              Delete Family Member?
            </Text>
            <Text
              style={{ fontSize: 12, color: "#6B7280", marginBottom: 16 }}
            >
              This will permanently remove the member and all their conditions.
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => {
                  setShowDeleteConfirm(false);
                  setMemberToDelete(null);
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={deleteFamilyMember}>
                <Text style={{ color: "#EF4444", fontWeight: "600" }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenSkeleton>
  );
}

/* ---------------- STYLES (UNCHANGED) ---------------- */

const styles = StyleSheet.create({
  scroll: { paddingBottom: 40 },

  infoCard: {
    flexDirection: "row",
    backgroundColor: "#F97316",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },

  infoTitle: { color: "#fff", fontWeight: "600", marginBottom: 4 },
  infoText: { color: "#fff", fontSize: 12 },

  addMember: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
  },

  addMemberText: { marginLeft: 8, color: "#2563EB", fontWeight: "500" },

  memberCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 12,
    padding: 12,
  },

  memberHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  memberName: { fontWeight: "600" },
  memberRelation: { fontSize: 12, color: "#6B7280" },

  rightSection: { flexDirection: "row", alignItems: "center" },

  conditionBadge: {
    backgroundColor: "#FFE4CC",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },

  badgeText: { fontSize: 11, color: "#F97316" },

  expandedArea: { marginTop: 12 },
  sectionTitle: { fontWeight: "500", marginBottom: 6 },

  conditionRow: { flexDirection: "row", flexWrap: "wrap" },

  conditionChip: {
    backgroundColor: "#FFE4CC",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 6,
  },

  chipText: { fontSize: 12, color: "#F97316" },

  notes: { fontSize: 12, color: "#6B7280", marginVertical: 6 },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  detailBtn: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  detailText: { fontSize: 12 },

  addConditionBtn: {
    backgroundColor: "#F97316",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  addConditionText: { fontSize: 12, color: "#fff" },

  shareBtn: {
    backgroundColor: "#F97316",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  shareText: { color: "#fff", fontWeight: "600" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },

  modalBox: { backgroundColor: "#fff", borderRadius: 16, padding: 20 },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },

  cancelText: { color: "#6B7280" },
  confirmText: { color: "#2563EB", fontWeight: "600" },
});
