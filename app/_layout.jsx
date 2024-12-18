import { router, Stack } from "expo-router";
import { ThemeProvider } from "../contexts/ThemeContext";
import { getSecureStore } from "../utils";
import { useEffect } from "react";

export default function Layout() {
  const getToken = async () => {
    const result = await getSecureStore("token");

    if (result) {
      router.replace("/(home)");
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
