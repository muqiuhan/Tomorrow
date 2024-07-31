import "react-native-url-polyfill";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Supabase from "@supabase/supabase-js";

export const supabase = Supabase.createClient(
  "https://rktlocwamclkhdgzzttv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrdGxvY3dhbWNsa2hkZ3p6dHR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzOTYwOTEsImV4cCI6MjAzNzk3MjA5MX0.5NK8ypeadnLpK5FaDFYSaMpvdQei-V9jcU9LRfoaBqg",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: false,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);