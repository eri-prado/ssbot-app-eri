import { DefaultTheme } from 'react-native-paper';

export const primaryColor = '#189AB4';
export const secondaryColor = '#00053f';

export const themePaper = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
    secondary: secondaryColor,
    elevation: {
      ...DefaultTheme.colors.elevation,
      level1: '#fff',
    },
    // outline: primaryColor,
  },
};
