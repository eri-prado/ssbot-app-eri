import { StyleSheet, Platform } from 'react-native';
import { primaryColor } from '../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    height: Platform.OS === 'ios' ? 160 : 120,
    backgroundColor: primaryColor,
    width: '100%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    
  },
});
