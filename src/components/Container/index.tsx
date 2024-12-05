import {  SafeAreaView } from 'react-native';
import { styles } from './styles';

export const Container = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => {
  return (
    <SafeAreaView style={{ ...styles.container, ...style }}>
      {children}
    </SafeAreaView>
  );
};
