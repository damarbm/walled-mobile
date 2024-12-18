import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

import NoteInput from "../../components/NoteInput";
import AmountInput from "../../components/AmountInput";
import Button from "../../components/Button";
import useFetch from "../../hooks/useFetch";
import { getSecureStore } from "../../utils";
import axios from "axios";
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
        Transfer
      </Text>
    </View>
  );
}

export default function Transfer() {
  const [recipientId, setRecipientId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const colors = useThemeColors();
  const { data: profile } = useFetch(
    `${process.env.EXPO_PUBLIC_API_URL}/profile`,
    jwtToken
  );

  const handleTransfer = async () => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/transactions/transfer`,
        { recipientId, amount, desc },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 200) {
        setRecipientId(0);
        setAmount(0);
        setDesc("");
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const getToken = async () => {
    const result = await getSecureStore("token");

    setJwtToken(result);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
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
      <View style={styles.destinationWrapper}>
        <Text style={styles.destinationText}>To: </Text>
        <TextInput
          style={styles.destinationInput}
          keyboardType="numeric"
          value={recipientId}
          onChangeText={setRecipientId}
        />
      </View>
      <AmountInput
        isTransfer={true}
        marginTop={28}
        balance={profile?.balance}
        amount={amount}
        setAmount={setAmount}
        colors={colors}
      />
      <NoteInput
        label="Note"
        marginTop={28}
        desc={desc}
        setDesc={setDesc}
        colors={colors}
      />
      <View style={styles.buttonWrapper}>
        <Button text="Transfer" handlePress={handleTransfer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  destinationWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#19918F",
    width: "100%",
    paddingVertical: 16,
    paddingLeft: 28,
  },
  destinationText: {
    color: "#ffffff",
    fontSize: 16,
  },
  destinationInput: {
    color: "#ffffff",
    fontSize: 16,
    width: "100%",
  },
  buttonWrapper: { marginTop: "auto", marginBottom: 24, paddingHorizontal: 12 },
});
