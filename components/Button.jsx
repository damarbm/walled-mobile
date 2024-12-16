import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Button({
  text,
  bgColor = "#19918F",
  handlePress = () => {},
}) {
  return (
    <TouchableOpacity
      style={{ ...styles.button, backgroundColor: bgColor }}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: 700,
    fontSize: 16,
  },
});
