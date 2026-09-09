// 👇 PASTE YOUR REAL SUPABASE PROJECT URL AND ANON KEY BELOW 👇
// Project Settings → API in your Supabase dashboard.
// The anon key is safe to expose publicly — it can only do what the
// database's Row Level Security policies (see supabase/schema.sql) allow.
var SUPABASE_URL = "https://omzzyauuxdjjxohpmvac.supabase.co";
var SUPABASE_ANON_KEY = "sb_publishable_TW0qctBjgDx_UgdbmGH7nw_pZILnftQ";

var damselSupabase = null;
if (
  typeof supabase !== "undefined" &&
  SUPABASE_URL.indexOf("YOUR-PROJECT-ID") === -1
) {
  damselSupabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
