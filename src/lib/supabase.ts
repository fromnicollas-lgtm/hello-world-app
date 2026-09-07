import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.types";

const envSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const envSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if legitimate Supabase credentials have been provided
export const isSupabaseConfigured = Boolean(
  envSupabaseUrl &&
  envSupabaseAnonKey &&
  envSupabaseUrl !== "https://your-project.supabase.co" &&
  envSupabaseAnonKey !== "your-anon-key-here" &&
  !envSupabaseUrl.includes("placeholder"),
);

// Fallback values prevent runtime crash on initialization if .env is missing
const supabaseUrl = isSupabaseConfigured
  ? envSupabaseUrl
  : "https://placeholder-project.supabase.co";

const supabaseAnonKey = isSupabaseConfigured ? envSupabaseAnonKey : "placeholder-anon-key";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  },
});
