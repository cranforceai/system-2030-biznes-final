import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://rekviiiaffovlzaltnkg.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "PASTE_YOUR_SUPABASE_ANON_KEY_HERE";

export const supabase = createClient(supabaseUrl, supabaseKey);