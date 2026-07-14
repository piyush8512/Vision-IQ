import {
  createFamilyHistory,
  deleteFamilyHistory,
  FamilyHistory,
  updateFamilyHistory,
  getFamilyHistory
} from "@/api/familyHistory";
import { ScreenSkeleton } from "@/components/layouts/ScreenSkeleton";
import { Ionicons } from "@expo/vector-icons";
import { CONDITIONS, RELATIONS } from "@/constants/options";
import React, { useEffect, useState } from "react";
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
  
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [familyMembers, setFamilyMembers] = useState<FamilyHistory[]>([]);

  /* ---------- Add Family Member ---------- */
  const [showAddMember, setShowAddMember] = useState(false);
  const [memberRelation, setMemberRelation] = useState("");
  const [selectConditions, setSelectConditions] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  /* ---------- Add Condition ---------- */
  const [showAddCondition, setShowAddCondition] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [conditionText, setConditionText] = useState("");

  /* ---------- Delete Member ---------- */
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

   /* ---------- edit Member details ---------- */
  const [showEditMember, setShowEditMember] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  

  function toggleCondition(condition: string) {
    setSelectConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((item: string) => item !== condition)
        : [...prev, condition],
    );
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const addFamilyMember = async () => {
    if (!memberRelation) return;
    if (selectConditions.length === 0) return;

    try {
      const newMember = await createFamilyHistory({
        relation: memberRelation,
        conditions: selectConditions,
        notes,
      });
      setFamilyMembers((prev) => [...prev, newMember]);
      setMemberRelation("");
      setSelectConditions([]);
      setNotes("");

      setShowAddMember(false);
    } catch (error) {
      console.error(error);
    }
    // TODO-API: CREATE_FAMILY_MEMBER
    // Request: { userId, name, relation, conditions[], notes }
    // Response: { success, memberId }
  };

  const addCondition = async () => {
    if (!conditionText.trim() || selectedMemberId === null) return;

    try {
      const member = familyMembers.find((item) => item.id === selectedMemberId);
      if (!member) {
        console.error("Member not found");
        return;
      }
      if (member.conditions.includes(conditionText)) {
        return;
      }
      const updateConditions = [...member.conditions, conditionText];
      const updatedMember = await updateFamilyHistory(member?.id, {
        conditions: updateConditions,
      });

      setFamilyMembers((prev) =>
        prev.map((item) =>
          item.id === updatedMember.id ? updatedMember : item,
        ),
      );
      setConditionText("");
      setSelectedMemberId(null);
      setShowAddCondition(false);
    } catch (error) {
      console.error(error);
    }

    // TODO-API: UPDATE_FAMILY_MEMBER
    // Request: { memberId, userId, newCondition }
    // Response: { success, updatedMember }
  };

  const deleteFamilyMember = async () => {
    if (!memberToDelete) return;

    try {
      await deleteFamilyHistory(memberToDelete);
      setFamilyMembers((prev) =>
        prev.filter((member) => member.id !== memberToDelete),
      );
      setExpandedId(null);
      setMemberToDelete(null);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error(error);
    }
    // TODO-API: DELETE_FAMILY_MEMBER
    // Request: { memberId, userId }
    // Response: { success }
  };

  const saveFamilyMember = async () => {
  if (!editingMemberId) return;

  const updated = await updateFamilyHistory(
    editingMemberId,
    {
      notes,
    }
  );

  setFamilyMembers((prev) =>
    prev.map((item) =>
      item.id === updated.id
        ? updated
        : item
    )
  );

  setShowEditMember(false);
};
const loadFamilyMembers = async () => {
  try {
    const members = await getFamilyHistory();
    setFamilyMembers(members);
  } catch (error) {
    console.error(error);
  }
};


useEffect(() => {
  loadFamilyMembers();

})

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
                  <Text style={styles.memberName}>{member.relation}</Text>
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
                      <Text style={styles.detailText} onPress={() => {   setEditingMemberId(member.id);
    setMemberToDelete(member.id);

    setMemberRelation(member.relation);
    setNotes(member.notes ?? "");

    setShowEditMember(true);}} >Edit Details</Text>
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
<Modal
  transparent
  visible={showAddMember}
  animationType="fade"
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalBox}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 16,
        }}
      >
        Add Family Member
      </Text>

      {/* Relation */}
      <Text
        style={{
          fontWeight: "600",
          marginBottom: 8,
        }}
      >
        Family Relation
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 16,
        }}
      >
        {RELATIONS.map((relation) => {
          const selected = memberRelation === relation;

          return (
            <TouchableOpacity
              key={relation}
              onPress={() => setMemberRelation(relation)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 8,
                marginBottom: 8,
                backgroundColor: selected ? "#2563EB" : "#F3F4F6",
              }}
            >
              <Text
                style={{
                  color: selected ? "#FFFFFF" : "#374151",
                  fontWeight: "500",
                }}
              >
                {relation}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Conditions */}
      <Text
        style={{
          fontWeight: "600",
          marginBottom: 8,
        }}
      >
        Eye Conditions
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 16,
        }}
      >
        {CONDITIONS.map((condition) => {
          const selected = selectConditions.includes(condition);

          return (
            <TouchableOpacity
              key={condition}
              onPress={() => toggleCondition(condition)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 8,
                marginBottom: 8,
                backgroundColor: selected ? "#F97316" : "#F3F4F6",
              }}
            >
              <Text
                style={{
                  color: selected ? "#FFFFFF" : "#374151",
                  fontWeight: "500",
                }}
              >
                {condition}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Notes */}
      <Text
        style={{
          fontWeight: "600",
          marginBottom: 8,
        }}
      >
        Notes (Optional)
      </Text>

      <TextInput
        placeholder="Add any additional notes..."
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={4}
        style={[
          styles.input,
          {
            height: 100,
            textAlignVertical: "top",
          },
        ]}
      />

      {/* Buttons */}
      <View style={styles.modalActions}>
        <TouchableOpacity
          onPress={() => {
            setShowAddMember(false);
            setMemberRelation("");
            setSelectConditions([]);
            setNotes("");
          }}
        >
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
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 16,
        }}
      >
        Add Eye Condition
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 16,
        }}
      >
        {CONDITIONS.map((condition) => {
          const selected = conditionText === condition;

          return (
            <TouchableOpacity
              key={condition}
              onPress={() => setConditionText(condition)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 8,
                marginBottom: 8,
                backgroundColor: selected ? "#F97316" : "#F3F4F6",
              }}
            >
              <Text
                style={{
                  color: selected ? "#FFFFFF" : "#374151",
                  fontWeight: "500",
                }}
              >
                {condition}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.modalActions}>
        <TouchableOpacity
          onPress={() => {
            setConditionText("");
            setShowAddCondition(false);
          }}
        >
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
      <Ionicons
        name="warning-outline"
        size={40}
        color="#EF4444"
        style={{ alignSelf: "center", marginBottom: 12 }}
      />

      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        Delete Family Member?
      </Text>

      <Text
        style={{
          fontSize: 14,
          color: "#6B7280",
          textAlign: "center",
          marginBottom: 24,
          lineHeight: 20,
        }}
      >
        This action cannot be undone. The selected family member and all
        associated eye conditions will be permanently removed.
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#D1D5DB",
            marginRight: 8,
            alignItems: "center",
          }}
          onPress={() => {
            setShowDeleteConfirm(false);
            setMemberToDelete(null);
          }}
        >
          <Text
            style={{
              color: "#374151",
              fontWeight: "600",
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 10,
            backgroundColor: "#EF4444",
            marginLeft: 8,
            alignItems: "center",
          }}
          onPress={deleteFamilyMember}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontWeight: "600",
            }}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

{/* Edit Family Member Modal */}
<Modal transparent visible={showEditMember} animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.modalBox}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Manage Family Member
      </Text>

      {/* Relation */}
      <Text
        style={{
          fontWeight: "600",
          marginBottom: 8,
        }}
      >
        Family Relation
      </Text>

      <View
        style={{
          backgroundColor: "#F3F4F6",
          borderRadius: 10,
          padding: 14,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#374151",
            fontWeight: "600",
          }}
        >
          {memberRelation}
        </Text>
      </View>

      {/* Notes */}
      <Text
        style={{
          fontWeight: "600",
          marginBottom: 8,
        }}
      >
        Notes
      </Text>

      <TextInput
        placeholder="Add notes..."
        multiline
        numberOfLines={4}
        value={notes}
        onChangeText={setNotes}
        style={[
          styles.input,
          {
            height: 100,
            textAlignVertical: "top",
            marginBottom: 20,
          },
        ]}
      />

      {/* Delete Button */}

      <TouchableOpacity
        style={{
          backgroundColor: "#FEF2F2",
          borderWidth: 1,
          borderColor: "#FCA5A5",
          borderRadius: 10,
          paddingVertical: 12,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 24,
        }}
        onPress={deleteFamilyMember}
      >
        <Ionicons
          name="trash-outline"
          size={20}
          color="#DC2626"
        />

        <Text
          style={{
            color: "#DC2626",
            fontWeight: "700",
            marginLeft: 8,
          }}
        >
          Delete Family Member
        </Text>
      </TouchableOpacity>

      {/* Footer */}

      <View style={styles.modalActions}>
        <TouchableOpacity
          onPress={() => {
            setShowEditMember(false);
          }}
        >
          <Text style={styles.cancelText}>
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={saveFamilyMember}
        >
          <Text style={styles.confirmText}>
            Save
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
