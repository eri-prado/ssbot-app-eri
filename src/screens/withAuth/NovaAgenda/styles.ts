import { Platform, StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  select: {
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: '#fff',
    borderRadius: 300,
    padding: Platform.OS == 'ios' ? 18 : 0
  },
});
