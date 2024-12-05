import { StyleSheet } from 'react-native';

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
  logo: {
    width: 225,
    justifyContent: 'center',
    resizeMode: 'contain',
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
});
