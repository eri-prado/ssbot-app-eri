import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    margin: Platform.OS === 'ios' ? 24 : 0
  },
});
