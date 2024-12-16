import { Link, router, Stack, useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

function LogoTitle() {
  const router = useRouter();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 12,
        width: "100%",
        marginLeft: 0,
      }}
    >
      <TouchableOpacity
        style={{ color: "black" }}
        onPress={() => {
          router.back();
        }}
      >
        <Feather name="chevron-left" size={28} color="black" />
      </TouchableOpacity>
      <Text style={{ fontWeight: 700, fontSize: 16, marginLeft: 16 }}>
        Terms and Condition
      </Text>
    </View>
  );
}

export default function Modal() {
  const isPresented = router.canGoBack();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            backgroundColor: "#000000",
          },
          headerBackButtonMenuEnabled: false,
          headerBackVisible: false,
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
      <ScrollView>
        <Text style={{ marginTop: 16 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
      </ScrollView>
      {!isPresented && <Link href="../">Dismiss modal</Link>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
});
