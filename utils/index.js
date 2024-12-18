import * as SecureStore from "expo-secure-store";

export const saveSecureStore = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

export const getSecureStore = async (key) => {
  let result = await SecureStore.getItemAsync(key);

  if (result) {
    return result;
  }
};
