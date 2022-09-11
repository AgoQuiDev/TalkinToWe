import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (value: any, key: string) => {
  try {
    const valueStored = typeof value !== 'string' ? value.toString() : value;
    await AsyncStorage.setItem(key, valueStored);
  } catch (e) {
    console.warn('Error on sotre Data: ', e);
  }
};

export const getData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.warn(`Error on get Data ${key}`, e);
    return undefined;
  }
};
