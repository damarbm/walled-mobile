import { TextInput, View, StyleSheet, Text } from "react-native";

export default function NoteInput({ label = "Input", marginTop }) {
  return (
    <View style={{ ...styles.container, marginTop }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 28,
    height: 100,
    backgroundColor: "#ffffff",
  },
  label: {
    color: "#B3B3B3",
    fontSize: 16,
    paddingTop: 12,
  },
  input: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#B3B3B3",
    paddingBottom: 12,
  },
});
