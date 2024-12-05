import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { Container } from '../../../components/Container';

import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../contexts/globalContext';
import { Surface } from 'react-native-paper';
import { useQueryClient } from '@tanstack/react-query';
import { INotificationUser } from '../../../types/types';
import moment from 'moment';
import Svg, { Path } from 'react-native-svg';

export default function Notificacoes({ navigation }: any) {
  const { userData } = useContext(GlobalContext);

  const queryClient = useQueryClient();

  const notificacoes: INotificationUser[] | [] =
    queryClient.getQueryData(['notificacoesKey']) || [];

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['notificacoesKey'] });
  }, []);

  return (
    <Container style={{ gap: 16 }}>
      <ScrollView>
        {Array.isArray(notificacoes) && notificacoes.length > 0 ? (
          notificacoes.map((item, index) => (
            <Surface
              key={index + item.strTitulo + item.intAppNotificacaoId}
              elevation={1}
              style={{ borderRadius: 12, marginBottom: 10 }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                  paddingRight: 30,
                }}
              >
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f8bb86',
                    borderRadius: 30,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    height: '100%',
                    width: 10,
                  }}
                ></View>
                <View
                  style={{
                    flexDirection: 'column',
                    gap: 4,
                    paddingRight: 30,
                    paddingTop: 14,
                    paddingBottom: 14,
                  }}
                >
                  <Text
                    style={{
                      color: '#ab815c',
                      fontWeight: '600',
                      fontSize: 20,
                    }}
                  >
                    {item.strTitulo}
                  </Text>
                  <Text style={{ fontSize: 14 }}>{item.strTexto}</Text>

                  <Text style={{ fontSize: 14 }}>
                    {item?.datEnvio
                      ? moment(item?.datEnvio, 'YYYY-MM-DD hh:mm:ss').format(
                          'DD/MM/YYYY HH:mm'
                        )
                      : ''}
                  </Text>
                </View>
              </View>
            </Surface>
          ))
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              marginTop: '70%',
            }}
          >
            <View style={{ opacity: 0.5 }}>
              <Svg
                width='24'
                height='24'
                fill='none'
                stroke='#333'
                stroke-width='1.5'
                stroke-linejoin='round'
              >
                <Path d='M12 17.848c5.639 0 8.248-.723 8.5-3.627 0-2.902-1.819-2.715-1.819-6.275C18.681 5.164 16.045 2 12 2S5.319 5.164 5.319 7.945c0 3.56-1.819 3.374-1.819 6.275.253 2.915 2.862 3.627 8.5 3.627z' />
                <Path
                  d='M14.389 20.857c-1.364 1.515-3.492 1.533-4.869 0'
                  strokeLinecap='round'
                />
              </Svg>
            </View>
            <Text>Nenhuma receita encontrado.</Text>
          </View>
        )}
      </ScrollView>
    </Container>
  );
}
