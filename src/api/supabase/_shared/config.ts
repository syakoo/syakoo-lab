import { createClient } from "@supabase/supabase-js";

import type { Database } from "database.types";

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// NOTE: supabase 内部で使用するサービスごとのキー
export const supabaseServiceId = "syakoo-lab";
/**
 * Supabase Client
 */
export const client = createClient<Database>(supabaseUrl, supabaseAnonKey);
