import { Stack, useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";

import NoteInput from "../../components/NoteInput";
import AmountInput from "../../components/AmountInput";
import Button from "../../components/Button";
import { getJwtAsyncStorage } from "../../utils";

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

  const onPress = async () => {
    try {
      const response = await fetch("http://10.237.11.158:8080/topup", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ amount }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJwtAsyncStorage(setJwtToken);
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
        <Button text="Top Up" onPress={onPress} />
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
