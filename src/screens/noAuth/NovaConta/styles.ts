import { StyleSheet } from 'react-native';
import { primaryColor } from '../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: '100%',
    gap: 16,
  },
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: primaryColor,
    fontWeight: '700',
    fontSize: 24,
  },
  containerInputs: {
    gap: 8,
  },
  input: {
    backgroundColor: '#eef1f5',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  containerButtons: {
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 16,
  },
  activeIndicator: {
    width: 24,
    height: 8,
    backgroundColor: primaryColor,
    borderRadius: 10,
  },
  inactiveIndicator: {
    backgroundColor: '#DFE0F3',
  },
});
