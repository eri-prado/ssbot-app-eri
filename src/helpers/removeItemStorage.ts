import AsyncStorage from '@react-native-async-storage/async-storage';
import { TypesKeysStorage } from '../types/types';

export const removeItemStorage = async (key: TypesKeysStorage) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};
