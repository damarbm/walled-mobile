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
        Transfer
      </Text>
    </View>
  );
}

export default function Transfer() {
  const [jwtToken, setJwtToken] = useState("");
  const { data: profile } = useFetch(
    "http://10.237.11.158:8080/profile",
    jwtToken
  );

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
      <View style={styles.destinationWrapper}>
        <Text style={styles.destinationText}>To: </Text>
        <TextInput style={styles.destinationInput} keyboardType="numeric" />
      </View>
      <AmountInput
        isTransfer={true}
        marginTop={28}
        balance={profile?.data?.balance}
      />
      <NoteInput label="Note" marginTop={28} />
      <View style={styles.buttonWrapper}>
        <Button text="Transfer" />
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
