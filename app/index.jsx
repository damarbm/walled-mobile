import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../components/Button";

export default function Index() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("jwt", JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeText = (state, value) => {
    setLoginData({ ...loginData, [state]: value });
  };

  const onPress = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        await storeData(data.data.token);
        router.replace("/(home)");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Image
        resizeMode="stretch"
        source={require("../assets/logo.png")}
        style={styles.logo}
      />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={loginData.email}
          onChangeText={(value) => onChangeText("email", value)}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={loginData.password}
          onChangeText={(value) => onChangeText("password", value)}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <View style={{ width: "90%", marginTop: 54 }}>
        <Button text="Login" onPress={onPress} />
      </View>
      <View style={{ width: "90%", marginTop: 16 }}>
        <Text>
          Don’t have account?{" "}
          <Link href="/register" style={{ color: "#19918F" }}>
            Register here
          </Link>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginBottom: 100,
    width: 233,
    height: 57,
  },
  inputWrapper: {
    display: "flex",
    gap: 22,
    width: "90%",
    marginHorizontal: "auto",
  },
  input: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    padding: 15,
    backgroundColor: "#FAFBFD",
    borderColor: "transparent",
    fontWeight: "600",
    borderRadius: 10,
  },
  login: {
    marginTop: 54,
    width: "90%",
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#19918F",
    textAlign: "center",
    color: "#ffffff",
    textAlign: "center",
    fontWeight: 700,
    fontSize: 16,
  },
});
