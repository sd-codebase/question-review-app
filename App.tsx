import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import Account from "./components/Account";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import PreviewContainer from "./components/preview/preview-container";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        {session && session.user ? (
          <PreviewContainer />
        ) : (
          // <Account key={session.user.id} session={session} />
          <Auth />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
