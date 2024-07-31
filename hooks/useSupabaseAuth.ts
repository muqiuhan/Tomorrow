import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store/useUserStore";

const useSupabaseAuth = () => {
  const { session, setSession, setUser } = useUserStore();

  const signInWithEmail = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error, data };
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });

    return { error, data };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setSession(null);
      setUser(null);
    }

    return { error };
  };

  const getUserProfile = async () => {
    if (!session?.user) throw new Error("No user on the session!");

    const { data, error, status } = await supabase
      .from("profiles")
      .select("username, full_name, avatar_url, website")
      .eq("id", session?.user.id)
      .single();

    return { data, error, status };
  };

  const updateUserProfile = async (
    username: string,
    fullName: string,
    avatarUrl: string,
    website: string
  ) => {
    if (!session?.user) throw new Error("No user on the session!");

    const { error } = await supabase.from("profiles").upsert({
      id: session?.user.id,
      username,
      full_name: fullName,
      website,
      avatar_url: avatarUrl,
      update_date: new Date(),
    });

    return { error };
  };

  return {
    signInWithEmail,
    signUpWithEmail,
    signOut,
    getUserProfile,
    updateUserProfile,
  };
};
