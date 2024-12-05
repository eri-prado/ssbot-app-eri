import { createDrawerNavigator } from '@react-navigation/drawer';
import TabRoutes from './tab.routes';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { primaryColor } from '../styles/theme';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes({ navigation }: any) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name='drawerRoutes'
        component={TabRoutes}
        options={{
          drawerLabel: 'MENU',
          // drawerIcon: (tab) => {
          //   return (
          //     <View>
          //       <IconMenu />
          //     </View>
          //   );
          // },
        }}
      />

      <Drawer.Screen
        name='especialidades'
        component={() => <View></View>}
        options={{
          drawerLabel: 'Especialidades',
          drawerIcon: (tab) => {
            return (
              <View style={{ marginRight: -25 }}>
                <AntDesign name='plus' size={24} color={primaryColor} />
              </View>
            );
          },
        }}
      />
      <Drawer.Screen
        name='profissionais'
        component={() => <View></View>}
        options={{
          drawerLabel: 'Profissionais',
          drawerIcon: (tab) => {
            return (
              <View style={{ marginRight: -25 }}>
                <AntDesign name='plus' size={24} color={primaryColor} />
              </View>
            );
          },
        }}
      />
      <Drawer.Screen
        name='planos'
        component={() => <View></View>}
        options={{
          drawerLabel: 'Planos',
          drawerIcon: (tab) => {
            return (
              <View style={{ marginRight: -25 }}>
                <AntDesign name='plus' size={24} color={primaryColor} />
              </View>
            );
          },
        }}
      />
      <Drawer.Screen
        name='sair'
        component={() => <View></View>}
        options={{
          drawerLabel: 'Sair',
          drawerIcon: (tab) => {
            return (
              <View style={{ marginRight: -25 }}>
                <Ionicons name='exit-outline' size={24} color={primaryColor} />
              </View>
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
}
