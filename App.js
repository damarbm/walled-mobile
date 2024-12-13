import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [text, onChangeText] = useState("");
  const [number, onChangeNumber] = useState("");

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
        source={require("./assets/logo.png")}
        style={styles.logo}
      />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={onChangeText}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
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
  button: {
    marginTop: 54,
    backgroundColor: "#19918F",
    width: "90%",
    paddingVertical: 12,
    borderRadius: 10,
    boxShadow: "0px 0px 10px 0px #19918F",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: 700,
  },
});
