import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { z } from "zod";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import Button from "../components/Button";
import { saveSecureStore } from "../utils";

const LOGIN_SCHEMA = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
});

export default function Index() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const onChangeText = (state, value) => {
    setLoginForm({ ...loginForm, [state]: value });

    try {
      LOGIN_SCHEMA.pick({ [state]: true }).parse({ [state]: value });
      setErrors((prev) => ({ ...prev, [state]: "" }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [state]: error.errors[0].message }));
    }
  };

  const handleSubmit = async () => {
    try {
      LOGIN_SCHEMA.parse(loginForm);

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
        loginForm
      );

      if (response.status === 200) {
        saveSecureStore("token", response.data.data.token);
        router.replace("/(home)");
      }
    } catch (error) {
      if (error?.response) {
        setServerError(error.response.data.message);

        return;
      }

      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="stretch"
        source={require("../assets/logo.png")}
        style={styles.logo}
      />
      {serverError && <Text style={{ color: "red" }}>{serverError}</Text>}
      <View style={styles.inputWrapper}>
        <View>
          <TextInput
            style={styles.input}
            value={loginForm.email}
            onChangeText={(value) => onChangeText("email", value)}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && (
            <Text style={styles.errorMessage}>{errors.email}</Text>
          )}
        </View>
        <View>
          <TextInput
            style={styles.input}
            value={loginForm.password}
            onChangeText={(value) => onChangeText("password", value)}
            placeholder="Password"
            secureTextEntry
          />
          {errors.password && (
            <Text style={styles.errorMessage}>{errors.password}</Text>
          )}
        </View>
      </View>
      <View style={{ width: "90%", marginTop: 54 }}>
        <Button text="Login" handlePress={handleSubmit} />
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
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
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
  errorMessage: {
    color: "red",
  },
});
