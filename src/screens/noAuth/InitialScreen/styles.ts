import { StyleSheet } from "react-native";
import { primaryColor } from "../../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  nomeEmpresa: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'left',
    width: '100%',
    paddingLeft: 24,
  },
  image: {
    width: 400,
    height: 400,
    objectFit: 'contain',
    marginBottom: -4,
  },
  containerBottom: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '100%',
    height: '35%',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: 24,
  },
  title: {
    color: '#101010',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    // fontFamily: 'Inter_700Bold',
  },
  text: {
    color: '#878787',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 20,
    width: '85%',
    // fontFamily: 'Inter_400Regular',
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 45,
  },
});
