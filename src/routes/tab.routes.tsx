import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, View } from 'react-native';
import IconHome from '../../assets/icons/IconHome';
import IconAgenda from '../../assets/icons/IconAgenda';
import IconExame from '../../assets/icons/IconExame';
import Receitas from '../screens/withAuth/Receitas';
import IconReceita from '../../assets/icons/IconReceita';
import IconPerfil from '../../assets/icons/IconPerfil';
import HeaderLayout from '../screens/withAuth/HeaderLayout';
import { primaryColor } from '../styles/theme';
import Perfil from '../screens/withAuth/Perfil';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Laudos from '../screens/withAuth/Laudos';
import Inicio from '../screens/withAuth/Inicio';
import Agenda from '../screens/withAuth/Agenda';
import Exames from '../screens/withAuth/Laudos';

const Tab = createBottomTabNavigator();

export default function TabRoutes({ navigation }: any) {
  return (
    <>
      <BottomSheetModalProvider>
        <HeaderLayout navigation={navigation} />

        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: primaryColor,
            headerShown: false,
            tabBarStyle: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingTop: Platform.OS == 'ios' ? 16 : 8,
              paddingBottom: Platform.OS == 'ios' ? 32 : 8,
              height: Platform.OS == 'ios' ? 90 : 60,
            },
          }}
        >
          <Tab.Screen
            name='Início'
            component={Inicio}
            options={{
              tabBarIcon: (tab) => {
                return (
                  <View
                    style={{
                      ...styles.boxIcon,
                      backgroundColor: tab.focused ? '#F5F5FF' : 'transparent',
                    }}
                  >
                    <IconHome type={tab.focused ? 'filled' : 'outline'} />
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name='Agenda'
            component={Agenda}
            options={{
              tabBarIcon: (tab) => {
                return (
                  <View
                    style={{
                      ...styles.boxIcon,
                      backgroundColor: tab.focused ? '#F5F5FF' : 'transparent',
                    }}
                  >
                    <IconAgenda type={tab.focused ? 'filled' : 'outline'} />
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name='Exames'
            component={Exames}
            options={{
              tabBarIcon: (tab) => {
                return (
                  <View
                    style={{
                      ...styles.boxIcon,
                      backgroundColor: tab.focused ? '#F5F5FF' : 'transparent',
                    }}
                  >
                    <IconExame type={tab.focused ? 'filled' : 'outline'} />
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name='Receitas'
            component={Receitas}
            options={{
              tabBarIcon: (tab) => {
                return (
                  <View
                    style={{
                      ...styles.boxIcon,
                      backgroundColor: tab.focused ? '#F5F5FF' : 'transparent',
                    }}
                  >
                    <IconReceita type={tab.focused ? 'filled' : 'outline'} />
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name='Perfil'
            component={Perfil}
            options={{
              tabBarIcon: (tab) => {
                return (
                  <View
                    style={{
                      ...styles.boxIcon,
                      backgroundColor: tab.focused ? '#F5F5FF' : 'transparent',
                    }}
                  >
                    <IconPerfil type={tab.focused ? 'filled' : 'outline'} />
                  </View>
                );
              },
            }}
          />
        </Tab.Navigator>
      </BottomSheetModalProvider>
    </>
  );
}

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: 10,
  },
  boxIcon: {
    padding: 6,
    borderRadius: 100,
    marginBottom: -2,
  },
});
