import AsyncStorage from '@react-native-async-storage/async-storage';
import { TypesKeysStorage } from '../types/types';

export const getItemStorage = async (key: TypesKeysStorage) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log(e);
  }
};
