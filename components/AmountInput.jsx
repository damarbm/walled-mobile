import { StyleSheet, Text, TextInput, View } from "react-native";

export default function AmountInput({
  isTransfer,
  balance,
  amount,
  setAmount,
  colors,
}) {
  return (
    <View style={{ ...styles.amountWrapper, backgroundColor: colors.card }}>
      <Text style={styles.label}>Amount</Text>
      <View style={styles.inputWrapper}>
        <Text style={{ ...styles.currency, color: colors.text }}>IDR</Text>
        <TextInput
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={{ ...styles.input, color: colors.text }}
        />
      </View>
      {isTransfer && (
        <View style={styles.balanceWrapper}>
          <Text style={styles.balanceLabel}>Balance</Text>
          <Text style={styles.balanceValue}>
            IDR {balance?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  amountWrapper: {
    backgroundColor: "#ffffff",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 18,
  },
  label: {
    color: "#B3B3B3",
    fontSize: 16,
    paddingTop: 12,
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#B3B3B3",
    gap: 8,
    marginTop: 16,
  },
  currency: {
    fontSize: 16,
  },
  input: {
    width: "100%",
    fontSize: 36,
  },
  balanceWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  balanceLabel: {
    color: "#B3B3B3",
    fontSize: 12,
  },
  balanceValue: { color: "#19918F", fontSize: 12 },
});
