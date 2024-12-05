import {
  TouchableWithoutFeedback,
  ScrollView,
  Text,
  View,
  Platform,
} from 'react-native';
import { Surface } from 'react-native-paper';
import { Container } from '../../../components/Container';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { styles } from './styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import { primaryColor } from '../../../styles/theme';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheetSobre from './Components/BottomSheetSobre';
import BottomSheetFaleConosco from './Components/BottomSheetFaleConosco';
import Feather from '@expo/vector-icons/Feather';
import EPIStatusCard from './Components/EPIStatusCard';
import * as Notifications from 'expo-notifications';
import { RootStackParamList } from '../../../routes';
import { StackScreenProps } from '@react-navigation/stack';
import useCustomQuery from '../../../hooks/useCustomQuery';
import { GlobalContext } from '../../../contexts/globalContext';
import { useMutation } from '@tanstack/react-query';
import api from '../../../services/api';
import Toast from 'react-native-toast-message';
import { INotification } from '../../../types/types';
import * as Device from 'expo-device';
// import messaging from '@react-native-firebase/messaging';
import * as Linking from 'expo-linking';
import CustomAlert from '../../../components/CustomAlert';
import { Button, Text as TextPaper } from 'react-native-paper';
import Constants from 'expo-constants';
import { useNotification } from '../../../contexts/NotificationContext';
import * as Clipboard from 'expo-clipboard';

type NotificacoesProps = StackScreenProps<any>;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true,
    // priority:
  }),
});

export default function Inicio({ navigation }: NotificacoesProps) {
  const bottomSheetSobreRef = useRef<BottomSheetModal | null>(null);
  const bottomSheetProfissionaisRef = useRef<BottomSheetModal | null>(null);
  const bottomSheetEspecialidadesRef = useRef<BottomSheetModal | null>(null);
  const bottomSheetFaleConoscoRef = useRef<BottomSheetModal | null>(null);
  const [notificationData, setNotificationData] =
    useState<null | INotification>(null);
  const [visiblePermissaoAlert, setVisiblePermissaoAlert] = useState(false);

  const { notification, expoPushToken, error } = useNotification();

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(expoPushToken || '');
  };


  const closeAlert = () => setVisiblePermissaoAlert(false);

  const { userData, setUserData, setIsAuthenticated } =
    useContext(GlobalContext);

  const handlePressBottomSheetSobre = useCallback(() => {
    bottomSheetSobreRef.current?.present();
  }, []);

  const handlePressBottomSheetProfissionais = useCallback(() => {
    bottomSheetProfissionaisRef.current?.present();
  }, []);

  const handlePressBottomSheetEspecialidades = useCallback(() => {
    bottomSheetEspecialidadesRef.current?.present();
  }, []);

  const handlePressBottomSheetFaleConosco = useCallback(() => {
    bottomSheetFaleConoscoRef.current?.present();
  }, []);

  const tokenMutate = useMutation({
    mutationFn: (params: { [key: string]: any }) => {
      return api(userData?.strToken).put('usuarios/token', params);
    },
    onSuccess: (res) => {
      if ((res.data.type = 'success')) {
        // Toast.show({
        //   type: 'success',
        //   text1: String('Token registrado com sucesso!'),
        //   position: 'bottom',
        // });
      } else {
        Toast.show({
          type: 'error',
          text1: String(res.data.message),
          position: 'bottom',
        });
      }
    },
    onError: (err: any) => {
      if (err?.response?.data?.erro || err.message) {
        Toast.show({
          type: 'error',
          text1: String(err?.response?.data?.erro || err.message),
          position: 'bottom',
        });
      }
    },
  });

  function handleRegistrationError(errorMessage: string) {
    alert(errorMessage);
    throw new Error(errorMessage);
  }

  const openDeviceSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  async function handleCallNotification() {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        setVisiblePermissaoAlert(true);
        return;
      }
      const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }

      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        // let token = await Notifications.getDevicePushTokenAsync();
        if (pushTokenString) {
          console.log(pushTokenString)
          tokenMutate.mutate({
            strTokenPush: pushTokenString,
            strPlataforma: Platform.OS == 'ios' ? 'IOS' : 'ANDROID',
          });
        }
      } catch {
        handleRegistrationError(
          'Deve usar dispositivo físico para notificações push.'
        );
      }
      }

    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'Look at that notification',
    //     body: "I'm so proud of myself!",
    //   },
    //   trigger: null,
    // });
  }

  const notificationListener = useRef<any>({})
  const responseListener = useRef<any>({})

  useEffect(() => {
    // messaging().onMessage(async (message) => {
    //   setNotificationData(message as any);
    // });
    // handleCallNotification();


  // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //   setNotificationData(notification.request.content as any);
  // });

  // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //   console.log(response);
  // });

  // return () => {
  //   Notifications.removeNotificationSubscription(notificationListener.current);
  //   Notifications.removeNotificationSubscription(responseListener.current);
  // };

  }, []);

  return (
    <>
      <CustomAlert
        icon='warning'
        open={visiblePermissaoAlert}
        closeAlert={closeAlert}
        title={'Permitir notificações!'}
        content={
          <TextPaper style={{ textAlign: 'center' }} variant='bodyMedium'>
            Ative as permissões de notificações nas configurações do app para receber alertas do robô de EPI.
          </TextPaper>
        }
        actions={
          <>
            <Button onPress={closeAlert}>Sair</Button>
            <Button
              onPress={() => {
                openDeviceSettings();
                setVisiblePermissaoAlert(false);
              }}
            >
              Ativar
            </Button>
          </>
        }
      />
      <ScrollView>
        <Container style={{ gap: 16 }}>
          <BottomSheetSobre bottomSheetRef={bottomSheetSobreRef} />
          <BottomSheetFaleConosco bottomSheetRef={bottomSheetFaleConoscoRef} />
          <EPIStatusCard
            notificationData={notificationData}
            setNotificationData={setNotificationData}
          />
          {/* <TouchableWithoutFeedback onPress={handlePressBottomSheetSobre}>
          <Surface elevation={1} style={{ borderRadius: 12, padding: 14 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: primaryColor,
                  borderRadius: 30,
                  height: 40,
                  width: 40,
                }}
              >
                <Ionicons name='business-outline' size={20} color='#fff' />
              </View>
              <View style={{ flexDirection: 'column', gap: 4 }}>
                <Text
                  style={{
                    color: primaryColor,
                    fontWeight: '600',
                    fontSize: 20,
                  }}
                >
                  SSBot
                </Text>
                <Text style={{ fontSize: 14 }}>
                  Saiba mais sobre os nossos serviços
                </Text>
              </View>
            </View>
          </Surface>
        </TouchableWithoutFeedback> */}
             <Text>{expoPushToken}</Text>
        <Text>Latest notification:</Text>
        <Text>{notification?.request.content.title}</Text>
        <Text>{JSON.stringify(notification?.request.content.data, null, 2)}</Text>
          <TouchableWithoutFeedback onPress={handlePressBottomSheetFaleConosco}>
            <Surface elevation={1} style={{ borderRadius: 12, padding: 14 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  paddingRight: 30,
                }}
              >
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: primaryColor,
                    borderRadius: 30,
                    height: 40,
                    width: 40,
                  }}
                >
                  <AntDesign name='phone' size={20} color='#fff' />
                </View>
                <View
                  style={{ flexDirection: 'column', gap: 4, paddingRight: 30 }}
                >
                  <Text
                    style={{
                      color: primaryColor,
                      fontWeight: '600',
                      fontSize: 20,
                    }}
                  >
                    Fale Conosco
                  </Text>
                  <Text style={{ fontSize: 14 }}>
                    Caso tenha dúvidas, sugestões ou precise de mais informações
                  </Text>
                </View>
              </View>
            </Surface>
          </TouchableWithoutFeedback>
          <Button onPress={copyToClipboard}>Copiar</Button>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('EPI')}
            >
              <Surface
                elevation={1}
                style={{
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 8,
                  flexGrow: 1,
                  width: '40%',
                  backgroundColor: primaryColor,
                }}
              >
                <Feather name='plus-circle' size={24} color={'#d4e6ee'} />
                <Text
                  style={{ color: '#f1f1f1', fontWeight: '600', fontSize: 18 }}
                >
                  EPI
                </Text>
              </Surface>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('ASO')}
            >
              <Surface
                elevation={1}
                style={{
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: 'column',
                  gap: 8,
                  flexGrow: 1,
                  width: '40%',
                  backgroundColor: primaryColor,
                }}
              >
                <Feather name='plus-circle' size={24} color={'#d4e6ee'} />
                <Text
                  style={{ color: '#f1f1f1', fontWeight: '600', fontSize: 18 }}
                >
                  ASO
                </Text>
              </Surface>
            </TouchableWithoutFeedback>
          </View>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('riscos')}
            >
              <Surface
                elevation={1}
                style={{
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: 'column',
                  gap: 8,
                  flexGrow: 1,
                  width: '40%',
                  backgroundColor: primaryColor,
                }}
              >
                <Feather name='plus-circle' size={24} color={'#d4e6ee'} />
                <Text
                  style={{ color: '#f1f1f1', fontWeight: '600', fontSize: 18 }}
                >
                  Riscos
                </Text>
              </Surface>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('treinamentos')}
              style={{ flexGrow: 1, width: '40%' }}
            >
              <Surface
                elevation={1}
                style={{
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: 'column',
                  gap: 8,
                  flexGrow: 1,
                  width: '40%',
                  backgroundColor: primaryColor,
                }}
              >
                <Feather name='plus-circle' size={24} color={'#d4e6ee'} />
                <Text
                  style={{ color: '#f1f1f1', fontWeight: '600', fontSize: 18 }}
                >
                  Treinamentos
                </Text>
              </Surface>
            </TouchableWithoutFeedback>
          </View>
        </Container>
      </ScrollView>
    </>
  );
}
