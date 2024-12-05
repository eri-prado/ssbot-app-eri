import AsyncStorage from '@react-native-async-storage/async-storage';
import { TypesKeysStorage } from '../types/types';

export const setItemStorage = async (key: TypesKeysStorage, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};
