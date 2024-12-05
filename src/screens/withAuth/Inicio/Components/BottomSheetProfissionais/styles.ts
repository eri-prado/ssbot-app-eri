import { StyleSheet } from 'react-native';
import { primaryColor, secondaryColor } from '../../../../../styles/theme';

export const styles = StyleSheet.create({
  title: {
    color: primaryColor,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  text: {
    color: '#878787',
    fontSize: 15,
    lineHeight: 20,
  },

  container: {
    gap: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: secondaryColor,
    borderRadius: 16,
    padding: 16,
    gap: 16,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  teamTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  teamSubtitle: {
    fontSize: 16,
    color: '#fff',
  },
});
