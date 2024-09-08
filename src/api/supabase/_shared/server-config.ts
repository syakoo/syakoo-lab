import { createClient } from "@supabase/supabase-js";

import type { Database } from "database.types";

export const getServiceRoleClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY ?? "";

  return createClient<Database>(supabaseUrl, supabaseServiceKey);
};
