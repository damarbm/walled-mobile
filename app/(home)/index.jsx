import { Link, Stack } from "expo-router";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

import useFetch from "../../hooks/useFetch";
import { getSecureStore } from "../../utils";
import { useTheme } from "../../contexts/ThemeContext";
import { useThemeColors } from "../../hooks/useThemeColors";

function TransactionItem({ transaction, lastChild, userId, colors }) {
  const { type, date, amount, sender_id, recipient_id } = transaction;
  const isDebit = parseInt(userId) !== recipient_id;

  return (
    <View style={{ ...styles.transactionItem, paddingBottom: lastChild && 20 }}>
      <View>
        {type !== "TOP UP" && (
          <Text style={{ color: colors.text }}>
            {isDebit ? "From" : "To"} {9000 + parseInt(sender_id)}
          </Text>
        )}
        <Text style={{ color: colors.text }}>{type}</Text>
        <Text style={{ color: "#939393" }}>
          {new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Text>
      </View>
      <Text
        style={{
          color: isDebit || (type === "TOP UP" ? "#2DC071" : colors.text),
        }}
      >
        {isDebit || type === "TOP UP" ? "+ " : "- "}
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

function Header({ name, avatar, colors, isDarkMode }) {
  const { setIsDarkMode } = useTheme();

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
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
          <Text style={{ fontWeight: 700, color: colors.text }}>{name}</Text>
          <Text style={{ color: colors.text }}>Personal Account</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{ marginVertical: "auto" }}
        onPress={() => toggleTheme()}
      >
        <Feather
          name={!isDarkMode ? "sun" : "moon"}
          size={24}
          color="#F8AB39"
        />
      </TouchableOpacity>
    </View>
  );
}

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [jwtToken, setJwtToken] = useState("");
  const { isDarkMode } = useTheme();
  const colors = useThemeColors();
  const { data: transactions, fetchData: fetchTransactions } = useFetch(
    `${process.env.EXPO_PUBLIC_API_URL}/transactions`,
    jwtToken
  );
  const { data: profile, fetchData: fetchProfile } = useFetch(
    `${process.env.EXPO_PUBLIC_API_URL}/profile`,
    jwtToken
  );

  const toggleShowBalance = () => {
    setShowBalance((prev) => !prev);
  };

  const onRefresh = useCallback(() => {
    fetchTransactions();
    fetchProfile();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getSecureStore("token", setJwtToken);
  }, []);

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: colors.background }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: "#000",
          headerBackVisible: false,
          headerTitle: (props) => (
            <Header
              {...props}
              name={profile?.name}
              avatar={profile?.avatar_url}
              colors={colors}
              isDarkMode={isDarkMode}
            />
          ),
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.wrapper}>
          <View style={styles.introWrapper}>
            <View style={styles.introTextWrapper}>
              <Text style={{ ...styles.greetings, color: colors.text }}>
                Good Morning, {profile?.name?.split(" ")[0]}
              </Text>
              <Text style={{ ...styles.description, color: colors.text }}>
                Check all your incoming and outgoing transactions here
              </Text>
            </View>
            <Image
              source={
                isDarkMode
                  ? require("../../assets/welcome-dark.png")
                  : require("../../assets/welcome.png")
              }
              style={styles.introImage}
            />
          </View>
          <View style={styles.accountCard}>
            <Text style={{ color: "#ffffff" }}>Account No.</Text>
            <Text style={{ color: "#ffffff", fontWeight: 600 }}>
              {9000 + parseInt(profile?.id)}
            </Text>
          </View>
          <View style={{ ...styles.balanceCard, backgroundColor: colors.card }}>
            <View style={styles.balanceWrapper}>
              <View>
                <Text style={{ color: colors.text }}>Balance</Text>
                <View style={styles.balanceAmount}>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 600,
                      color: colors.text,
                    }}
                  >
                    IDR{" "}
                    {showBalance
                      ? profile?.balance?.replace(
                          /(\d)(?=(\d{3})+(?!\d))/g,
                          "$1."
                        )
                      : "*".repeat(profile?.balance?.length)}
                  </Text>
                  {showBalance ? (
                    <Ionicons
                      name="eye-outline"
                      size={24}
                      color="grey"
                      onPress={() => toggleShowBalance()}
                    />
                  ) : (
                    <Ionicons
                      name="eye-off-outline"
                      size={24}
                      color="grey"
                      onPress={() => toggleShowBalance()}
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
          <View
            style={{ ...styles.transactionCard, backgroundColor: colors.card }}
          >
            <Text style={{ ...styles.transactionLabel, color: colors.text }}>
              Transaction History
            </Text>
            <FlatList
              style={{
                borderTopColor: colors.text,
                borderTopWidth: StyleSheet.hairlineWidth,
              }}
              scrollEnabled={false}
              data={transactions}
              renderItem={({ item, index }) => {
                return (
                  <TransactionItem
                    key={item.id}
                    transaction={item}
                    lastChild={index === transactions?.length - 1}
                    userId={profile?.id}
                    colors={colors}
                  />
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingBottom: 16,
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
    height: "100%",
    flex: 1,
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
