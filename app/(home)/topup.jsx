import { Stack, useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import axios from "axios";

import NoteInput from "../../components/NoteInput";
import AmountInput from "../../components/AmountInput";
import Button from "../../components/Button";
import { getSecureStore } from "../../utils";
import { useThemeColors } from "../../hooks/useThemeColors";

function Header({ colors }) {
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
        onPress={() => {
          router.replace(-1);
        }}
      >
        <Feather name="chevron-left" size={28} color={colors.text} />
      </TouchableOpacity>
      <Text
        style={{
          fontWeight: 700,
          fontSize: 16,
          marginLeft: 16,
          color: colors.text,
        }}
      >
        Top Up
      </Text>
    </View>
  );
}

export default function Topup() {
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const colors = useThemeColors();

  const handleTopUp = async () => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/transactions/topup`,
        { amount, desc },
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
        setDesc("");
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    getSecureStore("token", setJwtToken);
  }, []);

  return (
    <View style={{...styles.container,  backgroundColor: colors.background }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerBackImageSource: true,
          headerTitle: (props) => <Header {...props} colors={colors} />,
        }}
      />
      <AmountInput amount={amount} setAmount={setAmount} colors={colors} />
      <NoteInput
        label="Note"
        marginTop={28}
        desc={desc}
        setDesc={setDesc}
        colors={colors}
      />
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
