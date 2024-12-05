import { Platform, RefreshControl, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { FAB, Portal, Surface } from 'react-native-paper';
import { useState } from 'react';
import moment from 'moment';
import { Container } from '../../../components/Container';
import IconAgenda from '../../../../assets/icons/IconAgenda';
import { primaryColor } from '../../../styles/theme';
import useCustomQuery from '../../../hooks/useCustomQuery';
import { useQueryClient } from '@tanstack/react-query';
import { IAgenda } from './types';
import { formatarAgendas } from './functions/formatarAgendas';
import { useIsFocused, useRoute } from '@react-navigation/native';

export default function Agenda({ navigation }: any) {
  const [agendasPaciente, setAgendasPaciente] = useState<{
    [key: string]: any;
  } | null>(null);
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const queryClient = useQueryClient();

  const isFocusedScreenAgenda = useIsFocused();

  function getNameDiaSemana(date: string) {
    const indexDiaSemana = moment(date, 'YYYY-MM-DD HH:mm:ss').day();
    return diasSemana[indexDiaSemana];
  }
  const route = useRoute();
  function getColorCard(status: string) {
    if (status == 'REALIZADO') {
      return { color: '#46af32', backgroundColor: '#e6f5e6' };
    }

    if (status == 'FALTA') {
      return { color: '#cb4849', backgroundColor: '#fff7f7' };
    }

    if (status == 'FUTURO') {
      return { color: '#3788d8', backgroundColor: '#d3f0fa' };
    }

    return { color: '#fff', backgroundColor: '#333' };
  }

  const agendamentosFetch = useCustomQuery({
    key: 'agendamentosKey',
    endpoint: '/usuarios/agendamentos',
    params: {},
  });

  const agendamentoFormatados = Array.isArray(agendamentosFetch?.data)
    ? formatarAgendas(agendamentosFetch.data)
    : [];

  return (
    <>
      {Platform.OS === 'ios' && isFocusedScreenAgenda && (
        <Portal>
          <FAB
            icon='calendar-plus'
            style={{ ...styles.fab, margin: 100 }}
            label='Agendar'
            color={'#fff'}
            onPress={() => navigation.navigate('novaAgenda')}
          />
        </Portal>
      )}

      {Platform.OS === 'android' && (
        <FAB
          icon='calendar-plus'
          style={styles.fab}
          label='Agendar'
          color={'#fff'}
          onPress={() => navigation.navigate('novaAgenda')}
        />
      )}

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={agendamentosFetch.isFetching}
            onRefresh={() => {
              queryClient.invalidateQueries({ queryKey: ['agendamentosKey'] });
            }}
          />
        }
      >
        <Container style={styles.container}>
          {(!Array.isArray(agendamentosFetch?.data) &&
            agendamentosFetch?.data?.length == 0) ||
          !agendamentosFetch?.data ? (
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
                <IconAgenda type='outline' />
              </View>
              <Text>Nenhum agendamento encontrado.</Text>
            </View>
          ) : (
            <View style={{ flexDirection: 'column', flexGrow: 1, gap: 16 }}>
              {Object.keys(agendamentoFormatados).map(
                (dia: any, indexGroup) => (
                  <View
                    key={dia + indexGroup}
                    style={{
                      flexDirection: 'row',
                      gap: 16,
                    }}
                  >
                    <View style={{ marginTop: 8, alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 28,
                          color: primaryColor,
                          fontWeight: 500,
                        }}
                      >
                        {dia?.substring(0, 2)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          color: primaryColor,
                          fontWeight: 400,
                          marginTop: -4,
                        }}
                      >
                        {getNameDiaSemana(
                          agendamentoFormatados[dia][0].datAgendamento
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        flexGrow: 1,
                        gap: 16,
                      }}
                    >
                      {agendamentoFormatados[dia].map(
                        (agenda: IAgenda, indexAgenda: number) => (
                          <Surface
                            elevation={1}
                            style={{
                              borderRadius: 12,
                              padding: 14,
                              width: '93%',
                            }}
                            key={dia + indexGroup + indexAgenda}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                              }}
                            >
                              <View style={{ flexDirection: 'column', gap: 4 }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    gap: 8,
                                    alignItems: 'center',
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontWeight: '600',
                                      fontSize: 14,
                                      color: '#333',
                                    }}
                                  >
                                    Dr(a).{' '}
                                    {agenda?.strProfissional.substring(0, 20)}
                                  </Text>
                                  {/* {agenda?.strStatusAgenda && (
                                    <Text
                                      style={{
                                        ...getColorCard(agenda.strStatusAgenda),
                                        padding: 4,
                                        borderRadius: 6,
                                        fontWeight: 600,
                                      }}
                                    >
                                      {agenda?.strStatusAgenda}
                                    </Text>
                                  )} */}
                                  <Text
                                    style={{
                                      color: '#46af32',
                                      backgroundColor: '#e6f5e6',
                                      padding: 4,
                                      borderRadius: 6,
                                      fontWeight: 600,
                                    }}
                                  >
                                    AGENDADO
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                  }}
                                >
                                  {agenda?.datAgendamento && (
                                    <Text>
                                      {moment(
                                        agenda.datAgendamento,
                                        'YYYY-MM-DD hh:mm:ss'
                                      ).format('DD/MM/YYYY HH:mm')}
                                    </Text>
                                  )}
                                  {agenda?.strTipoAgendamento && (
                                    <Text>
                                      {' | ' + agenda.strTipoAgendamento}
                                    </Text>
                                  )}
                                  {agenda?.strConvenio && (
                                    <Text>
                                      {'Convênio: ' + agenda.strConvenio}
                                    </Text>
                                  )}
                                </View>
                              </View>
                            </View>
                          </Surface>
                        )
                      )}
                    </View>
                  </View>
                )
              )}
            </View>
          )}
        </Container>
      </ScrollView>
    </>
  );
}
