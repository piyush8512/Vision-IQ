import { supabase } from "@/lib/supabase";
import type { TablesUpdate } from "@/types/database.types";

type ProfileUpdate = TablesUpdate<"profiles">;

// Complete onboarding
export async function completeOnboarding(updates:ProfileUpdate) {
const {
data:{user}
}=await supabase.auth.getUser();

if(!user){
throw new Error("User not found");
}

const {data,error}=await supabase
.from("profiles")
.update({
...updates,
// updated_at:new Date().toISOString()
})
.eq("id",user.id)
.select()
.single();

if(error) throw error;
return data;
}

// Fetch profile
export async function getProfile(){
const {
data:{user}
}=await supabase.auth.getUser();

if(!user){
 throw new Error("No user");
}

const {data,error}=await supabase
.from("profiles")
.select("*")
.eq("id",user.id)
.single();

if(error){
 throw error;
}

return data;
}

// // Update profile later
// export async function updateProfile(
// updates:any
// ){
// const {
// data:{user}
// }=await supabase.auth.getUser();

// if(!user){
//  throw new Error("No user");
// }

// const {data,error}=await supabase
// .from("profiles")
// .update({
// ...updates,
// updated_at:new Date().toISOString()
// })
// .eq("id",user.id)
// .select()
// .single();

// if(error){
//  throw error;
// }

// return data;
// }