import { supabase } from "@/lib/supabase";

import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/types/database.types";

export type FamilyHistory = Tables<"family_history">;

type FamilyHistoryInsert = TablesInsert<"family_history">;
type FamilyHistoryUpdate = TablesUpdate<"family_history">;

// CREATE FAMILY HISTORY
export async function createFamilyHistory(
  familyHistory: Omit<
    FamilyHistoryInsert,
    "id" | "user_id" | "created_at" | "updated_at"
  >
) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("family_history")
    .insert({
      ...familyHistory,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// GET ALL FAMILY HISTORY
export async function getFamilyHistory() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("family_history")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

// UPDATE FAMILY HISTORY
export async function updateFamilyHistory(
  id: string,
  updates: Omit<
    FamilyHistoryUpdate,
    "id" | "user_id" | "created_at" | "updated_at"
  >
) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("family_history")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// DELETE FAMILY HISTORY
export async function deleteFamilyHistory(id: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("family_history")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }

  return true;
}

// GET SINGLE FAMILY HISTORY
export async function getFamilyHistoryById(id: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("family_history")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}