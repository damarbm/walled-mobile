import { Link, Stack } from "expo-router";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

import useFetch from "../../hooks/useFetch";
import { getJwtAsyncStorage } from "../../utils";

function TransactionItem({ transaction, lastChild }) {
  const { type, date, amount, address } = transaction;

  return (
    <View style={{ ...styles.transactionItem, paddingBottom: lastChild && 20 }}>
      <View>
        <Text>{`${type === "DEBIT" ? "From" : "To"} ${address}`}</Text>
        <Text>{type}</Text>
        <Text>
          {new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Text>
      </View>
      <Text style={{ color: type === "DEBIT" && "#2DC071" }}>
        {type === "DEBIT" ? "+ " : "- "}
        {String(amount).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
      </Text>
    </View>
  );
}

function ActionButton({ icon, to }) {
  return (
    <Link href={to} style={styles.balanceButton}>
      <Feather name={icon} size={24} color="white" />
    </Link>
  );
}

function LogoTitle({ name, avatar }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        boxShadow: "0px 4px 10px 0px #D1D1D140",
        width: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Image style={styles.image} source={{ uri: avatar }} />
        <View>
          <Text style={{ fontWeight: 700 }}>{name}</Text>
          <Text>Personal Account</Text>
        </View>
      </View>
      <TouchableOpacity style={{ marginVertical: "auto" }}>
        <Feather name="sun" size={24} color="#F8AB39" />
      </TouchableOpacity>
    </View>
  );
}

export default function Home() {
  const [showBalance, setShowBalance] = useState(true);
  const [jwtToken, setJwtToken] = useState("");
  const { data: transactions } = useFetch(
    `${process.env.EXPO_PUBLIC_API_URL}/transactions`,
    jwtToken
  );
  const { data: profile } = useFetch(
    `${process.env.EXPO_PUBLIC_API_URL}/profile`,
    jwtToken
  );

  const toggleBalance = () => {
    setShowBalance((prev) => !prev);
  };

  useEffect(() => {
    getJwtAsyncStorage(setJwtToken);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffffff" },
          headerTintColor: "#000",
          headerBackVisible: false,
          headerTitle: (props) => (
            <LogoTitle
              {...props}
              name={profile?.data?.name}
              avatar={profile?.data?.avatar_url}
            />
          ),
        }}
      />
      <View style={styles.introWrapper}>
        <View style={styles.introTextWrapper}>
          <Text style={styles.greetings}>
            Good Morning, {profile?.data?.name.split(" ")[0]}
          </Text>
          <Text style={styles.description}>
            Check all your incoming and outgoing transactions here
          </Text>
        </View>
        <Image
          source={require("../../assets/welcome.png")}
          style={styles.introImage}
        />
      </View>
      <View style={styles.accountCard}>
        <Text style={{ color: "#ffffff" }}>Account No.</Text>
        <Text style={{ color: "#ffffff", fontWeight: 600 }}>
          {9000 + parseInt(profile?.data?.id)}
        </Text>
      </View>
      <View style={styles.balanceCard}>
        <View style={styles.balanceWrapper}>
          <View>
            <Text>Balance</Text>
            <View style={styles.balanceAmount}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                }}
              >
                IDR{" "}
                {showBalance
                  ? profile?.data?.balance?.replace(
                      /(\d)(?=(\d{3})+(?!\d))/g,
                      "$1."
                    )
                  : "*".repeat(profile?.data?.balance.length)}
              </Text>
              {showBalance ? (
                <Ionicons
                  name="eye-outline"
                  size={24}
                  color="grey"
                  onPress={() => toggleBalance()}
                />
              ) : (
                <Ionicons
                  name="eye-off-outline"
                  size={24}
                  color="grey"
                  onPress={() => toggleBalance()}
                />
              )}
            </View>
          </View>
          <View style={styles.balanceButtonWrapper}>
            <ActionButton icon="plus" to="/topup" />
            <ActionButton icon="send" to="/transfer" />
          </View>
        </View>
      </View>
      <View style={styles.transactionCard}>
        <Text style={styles.transactionLabel}>Transaction History</Text>
        <View
          style={{
            borderTopColor: "black",
            borderTopWidth: StyleSheet.hairlineWidth,
          }}
        >
          {transactions?.data?.map((transaction, index) => {
            return (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                lastChild={index === transactions?.data?.length - 1}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  introWrapper: {
    display: "flex",
    flexDirection: "row",
    marginTop: 36,
  },
  introTextWrapper: {
    flex: 1,
  },
  greetings: {
    fontWeight: 700,
    fontSize: 20,
  },
  description: {
    fontSize: 16,
    marginTop: 20,
  },
  introImage: {
    width: 81,
    height: 77,
    margin: "auto",
    flex: 0.3,
    objectFit: "contain",
  },
  accountCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#19918F",
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 28,
    borderRadius: 10,
  },
  balanceCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 28,
    borderRadius: 10,
  },
  balanceWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  balanceAmount: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  balanceButtonWrapper: {
    display: "flex",
    gap: 18,
  },
  balanceButton: {
    backgroundColor: "#19918F",
    padding: 10,
    boxShadow: "0 0 10 #19918F",
    borderRadius: 10,
  },
  transactionCard: {
    backgroundColor: "#ffffff",
    marginTop: 20,
    borderRadius: 10,
  },
  transactionLabel: {
    fontWeight: 700,
    fontSize: 16,
    padding: 20,
  },
  transactionItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
