import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import Checkbox from "expo-checkbox";

import Button from "../components/Button";

export default function Register() {
  const [isChecked, setChecked] = useState(false);

  return (
    <View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: "#ffffff",
          paddingHorizontal: 20,
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
            placeholder="Fullname"
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Avatar Url"
            keyboardType="default"
          />
        </View>
        <View style={styles.checkboxWrapper}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
          />
          <Text style={{ width: "90%" }}>
            I have read and agree to the{" "}
            <Link href="/modal" style={{ color: "#19918F" }}>
              Terms and Conditions <Text style={{ color: "red" }}>*</Text>
            </Link>
          </Text>
        </View>
        <View style={{ marginTop: 16 }}>
          <Button text="Register" />
        </View>
        <View style={{ width: "100%", marginTop: 16 }}>
          <Text>
            Already have an account?{" "}
            <Link href="/" style={{ color: "#19918F" }}>
              Login here
            </Link>
          </Text>
        </View>
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
    marginHorizontal: "auto",
    width: "100%",
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
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    gap: 12,
    width: "100%",
  },
  checkbox: {
    backgroundColor: "#FAFBFD",
    borderColor: "transparent",
    width: 30,
    height: 30,
    borderRadius: 5,
  },
});
