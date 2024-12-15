import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../components/Button";
import { Link } from "expo-router";

export default function Register() {
  return (
    <View>
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
        <Button text="Register" />
        <View style={{ width: "90%", marginTop: 16 }}>
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
});
