import { StyleSheet } from 'react-native';
import { primaryColor } from '../../../styles/theme';
export const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    marginRight: 24,
    right: 0,
    bottom: 0,
    zIndex: 99,
    backgroundColor: primaryColor
  },
  container: {
    gap: 16,
  },
});
