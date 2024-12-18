import { Stack } from "expo-router";
import { ThemeProvider } from "../contexts/ThemeContext";

export default function Layout() {
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
