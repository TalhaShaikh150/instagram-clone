import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabaseUrl = "https://qkfpksymvoyepsbbfpmq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrZnBrc3ltdm95ZXBzYmJmcG1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3OTU5NzQsImV4cCI6MjA2NDM3MTk3NH0.dOSrNcPAMBXkcEDfsLCzXoX1uWhiHCaJLpizQUuB1i8";

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function sendUserDetailsToDb(
  firstName,
  lastName,
  email,
  password
) {
  const { data, error } = await supabase
    .from("userDetails")
    .insert([{ firstName, lastName, email, password }])
    .select();

  if (error) {
    console.error("❌ Insert Error:", error.message);
    return null;
  }
  return data.length > 0 ? data[0] : null;
}

export async function getUserDetailsFromDb() {
  const { data, error } = await supabase.from("userDetails").select("*");

  if (error) {
    console.error("❌Fetching Error:", error.message);
    return [];
  }

  return data;
}
