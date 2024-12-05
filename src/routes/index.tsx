import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InitialScreen from '../screens/noAuth/InitialScreen';
import Login from '../screens/noAuth/Login';
import TabRoutes from './tab.routes';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../contexts/globalContext';
import NovaAgenda from '../screens/withAuth/NovaAgenda';
import MinhaConta from '../screens/withAuth/MinhaConta';
import Notificacoes from '../screens/withAuth/Notificacoes';
import SelecionaAgenda from '../screens/withAuth/SelecionaAgenda';
import EPI from '../screens/withAuth/EPI';
import ASO from '../screens/withAuth/ASO';
import Riscos from '../screens/withAuth/Riscos';
import Treinamentos from '../screens/withAuth/Treinamentos';
// import messaging from '@react-native-firebase/messaging';
import AlterarSenha from '../screens/withAuth/AlterarSenha';
import { Button } from 'react-native-paper';
import { Platform, Text } from 'react-native';
import { NotificationProvider } from '../contexts/NotificationContext';

export type RootStackParamList = {
  initialScreen: undefined;
  login: undefined;
  drawerRoutes: undefined;
  tabRoutes: undefined;
  novaAgenda: undefined;
  selecionaData: undefined;
  minhaConta: undefined;
  alterarSenha: undefined;
  notificacoes: undefined;
  EPI: undefined;
  ASO: undefined;
  riscos: undefined;
  treinamentos: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();
export default function RouteStack() {
  const { isAuthenticated } = useContext(GlobalContext);

  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();

  //   const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log("Authorization status:", authStatus);
  //   }
  // }

  // useEffect(() => {
  // if (requestUserPermission() as any) {
  //   messaging().getToken().then((token) => {
  //     console.log(token)
  //   })
  // } else {
  //   console.log('Sem permissão')
  // }

  // messaging().getInitialNotification().then(async (remoteMessage) => {
  //   if (remoteMessage) {
  //     console.log(
  //       "Notification caused app to open from quit state:",
  //       remoteMessage.notification)
  //     }
  //   })

  //   messaging().onNotificationOpenedApp((remoteMessage) => {
  //     console.log("Notification caused app to open from background state:", remoteMessage.notification)
  //   })

  //   messaging().setBackgroundMessageHandler(async (removeMessage) => {
  //     console.log("Message handled in the background", removeMessage)
  //   })

  // const unsubscribe = messaging().onMessage(async (removeMessage) => {
  //   Alert.alert("A new FCM message arrived", JSON.stringify(removeMessage))
  // })

  // return unsubscribe

  // }, [])

  const headerBackTitle = {
    headerBackTitle: Platform.OS == 'ios' ? 'Voltar' : '',
  };

  return (
    <>
      <NotificationProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='initialScreen'>
            {isAuthenticated ? (
              <>
                <Stack.Screen
                  // name='drawerRoutes'
                  // component={DrawerRoutes}
                  name='tabRoutes'
                  component={TabRoutes}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='novaAgenda'
                  component={NovaAgenda}
                  options={{ title: 'Novo Agendamento', ...headerBackTitle }}
                />
                <Stack.Screen
                  name='selecionaData'
                  component={SelecionaAgenda}
                  options={{ title: 'Selecionar Data', ...headerBackTitle }}
                />
                <Stack.Screen
                  name='minhaConta'
                  component={MinhaConta}
                  options={{ title: 'Minha Conta', ...headerBackTitle }}
                />
                <Stack.Screen
                  name='alterarSenha'
                  component={AlterarSenha}
                  options={{ title: 'Alterar Senha', ...headerBackTitle }}
                />
                <Stack.Screen
                  name='notificacoes'
                  component={Notificacoes}
                  options={{ title: 'Notificações', ...headerBackTitle }}
                />
                <Stack.Screen
                  name='EPI'
                  component={EPI}
                  options={{ title: 'Entrega de EPI', ...headerBackTitle }}
                />
                <Stack.Screen
                  name='ASO'
                  component={ASO}
                  options={{ title: 'ASO', ...headerBackTitle }}
                />
                <Stack.Screen
                  name='riscos'
                  component={Riscos}
                  options={{ title: 'Riscos', ...headerBackTitle }}
                />
                <Stack.Screen
                  name='treinamentos'
                  component={Treinamentos}
                  options={{ title: 'Treinamentos', ...headerBackTitle }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name='initialScreen'
                  component={InitialScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='login'
                  component={Login}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </NotificationProvider>
    </>
  );
}
