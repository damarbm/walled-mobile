import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";
import { useThemeColors } from "../../hooks/useThemeColors";

export default function TabLayout() {
  const colors = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#19918F",
        tabBarStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="topup"
        options={{
          title: "Topup",
          tabBarIcon: ({ color }) => (
            <Entypo name="wallet" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transfer"
        options={{
          title: "Transfer",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="money-bill-transfer" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
