import { Stack, useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import axios from "axios";

import NoteInput from "../../components/NoteInput";
import AmountInput from "../../components/AmountInput";
import Button from "../../components/Button";
import { getSecureStore } from "../../utils";

function LogoTitle() {
  const router = useRouter();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
      }}
    >
      <TouchableOpacity
        style={{ color: "black" }}
        onPress={() => {
          router.replace(-1);
        }}
      >
        <Feather name="chevron-left" size={28} color="black" />
      </TouchableOpacity>
      <Text style={{ fontWeight: 700, fontSize: 16, marginLeft: 16 }}>
        Top Up
      </Text>
    </View>
  );
}

export default function Topup() {
  const [amount, setAmount] = useState(0);
  const [jwtToken, setJwtToken] = useState("");

  const handleTopUp = async () => {
    try {
      const response = await axios.patch(
        `${process.env.EXPO_PUBLIC_API_URL}/topup`,
        { amount },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 200) {
        setAmount(0);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    getSecureStore("token", setJwtToken);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffffff" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerBackImageSource: true,
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
      <AmountInput amount={amount} setAmount={setAmount} />
      <NoteInput label="Note" marginTop={28} />
      <View style={styles.buttonWrapper}>
        <Button text="Top Up" handlePress={handleTopUp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  buttonWrapper: { marginTop: "auto", marginBottom: 24, paddingHorizontal: 12 },
});
