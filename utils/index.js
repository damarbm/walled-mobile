import AsyncStorage from "@react-native-async-storage/async-storage";

export const getJwtAsyncStorage = async (setState) => {
  try {
    const jsonValue = await AsyncStorage.getItem("jwt");

    return jsonValue != null ? setState(JSON.parse(jsonValue)) : null;
  } catch (error) {
    console.error(error);
  }
};
