import { StyleSheet } from 'react-native';
import { primaryColor } from '../../../../../styles/theme';

export const styles = StyleSheet.create({
  title: {
    color: primaryColor,
    fontSize: 24,
    fontWeight: '700',
  },
  text: {
    color: '#878787',
    fontSize: 15,
    lineHeight: 24,
  },
  container: {
    paddingVertical: 24,
    paddingHorizontal: 36,
    marginBottom: 45,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 16,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textOption: {
    fontSize: 18,
    color: primaryColor,
    fontWeight: '700',
  },
});
