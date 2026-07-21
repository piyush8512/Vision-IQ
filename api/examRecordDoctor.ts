import { supabase } from "@/lib/supabase";

import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/types/database.types";

export type ExamRecord = Tables<"exam_records">;
// type ExamRecordInsert = TablesInsert<"exam_records">;
// type ExamRecordUpdate = TablesUpdate<"exam_records">;

 //Get exam record by appointment ID
export async function getExamRecordByAppointment(
  appointmentId: string
): Promise<ExamRecord | null> {
  const { data, error } = await supabase
    .from("exam_records")
    .select("*")
    .eq("appointment_id", appointmentId)
    .single();

  if (error) throw error;
  return data;
}

//Create exam record
// export async function createExamRecord(
//   examRecord: Omit<
//     ExamRecordInsert,
//     "id" | "created_at" | "updated_at"
//   >
// ): Promise<ExamRecord> {
//   const { data, error } = await supabase
//     .from("exam_records")
//     .insert(examRecord)
//     .select()
//     .single();

//   if (error) throw error;

//   return data;
// }

// Update exam record
// export async function updateExamRecord(
//   id: string,
//   updates: Omit<
//     ExamRecordUpdate,
//     "id" | "created_at" | "updated_at"
//   >
// ): Promise<ExamRecord> {
//   const { data, error } = await supabase
//     .from("exam_records")
//     .update(updates)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) throw error;

//   return data;
// }
 
// Delete exam record
// export async function deleteExamRecord(id: string): Promise<void> {
//   const { error } = await supabase
//     .from("exam_records")
//     .delete()
//     .eq("id", id);

//   if (error) throw error;
// }