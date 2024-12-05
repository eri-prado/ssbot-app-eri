import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { styles } from './styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigationState } from '@react-navigation/native';
import { GlobalContext } from '../../../../../contexts/globalContext';
import { primaryColor } from '../../../../../styles/theme';
import { INotification } from '../../../../../types/types';

interface IEPIStatusCard {
  notificationData: INotification | null;
  setNotificationData: Dispatch<SetStateAction<null | INotification>>
}

export default function EPIStatusCard({notificationData, setNotificationData}: IEPIStatusCard) {
  const { checkboxesEpi, setCheckboxesEpi } = useContext(GlobalContext);
  const [showBlinkingBorder, setShowBlinkingBorder] = useState(false);

  const routeName = useNavigationState(
    (state) => state.routes[state.index].name
  );

  const [testeNotificationCard, setTesteNotificationCard] = useState(false);

  const uncheckedsAPI = checkboxesEpi.filter((api) => api.checked == false);

  const unchekedNames = uncheckedsAPI.map((api) => api.nome).join(', ');

  const hasUnchecked = uncheckedsAPI.length > 0;
  useEffect(() => {
    if (notificationData) {
      let interval: any;
      let blinkCount = 0;
      // if (hasUnchecked) {
        interval = setInterval(() => {
          setShowBlinkingBorder((prev) => !prev);
          blinkCount++;
          if (blinkCount >= 10) {
            clearInterval(interval);
            setShowBlinkingBorder(false);
            setNotificationData(null);
          }
        }, 500);
      // }

      return () => clearInterval(interval);
    }
  }, [notificationData]);


  return (
    <View>
      <TouchableWithoutFeedback>
        <Surface
          style={{
            ...styles.surface,
            height: 200,
            position: 'relative',
            alignItems: 'flex-end',
            backgroundColor: notificationData ? '#FFFFF2' : '#F2F7FF',
            borderWidth: notificationData ? 2 : 0,
            borderColor: showBlinkingBorder ? '#f9bf41' : 'transparent',
            overflow: 'visible',
          }}
          elevation={1}
        >
          {notificationData ? (
            <Image
              source={require(`../../../../../../assets/epi/epi-warn.png`)}
              style={{
                width: 105,
                height: 180,
                marginLeft: 16,
                position: 'absolute',
                bottom: 0,
                left: 0,
              }}
            />
          ) : (
            <Image
              source={require(`../../../../../../assets/epi/epi-success.png`)}
              style={{
                width: 100,
                height: 190,
                marginLeft: 16,
                position: 'absolute',
                bottom: 0,
                left: 0,
              }}
            />
          )}

          <View
            style={{
              width: '65%',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              marginBottom: 16,
              gap: 8,
            }}
          >
            {notificationData ? (
              <Ionicons name='warning' size={36} color={'#f9bf41'} />
            ) : (
              <Ionicons name='checkmark-circle' size={36} color={primaryColor} />
            )}

            <Text
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: notificationData ? '#f9bf41' : primaryColor,
                textAlign: 'center',
                lineHeight: 24,
              }}
            >
              {notificationData
                ? 'EPIs não encontrados: '
                : 'Parabéns! Todos os EPIs estão em conformidade.'}
            </Text>

            {notificationData && (
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#f9bf41',
                  textAlign: 'center',
                }}
              >
                {notificationData?.body}
                {/* Óculos de proteção, Luvas, Capacetes, Protetores auriculares, Máscaras, Abafadores de som */}
              </Text>
            )}
            {/* {uncheckedsAPI.length > 0 &&
              uncheckedsAPI.map((epi) => (
                <Text
                  key={epi.id}
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: hasUnchecked ? '#f9bf41' : '#178C23',
                    textAlign: 'center',
                  }}
                >
                  {unchekedNames.toUpperCase()}
                </Text>
              ))} */}
          </View>
        </Surface>

      </TouchableWithoutFeedback>
    </View>
  );
}
