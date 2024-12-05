import { TouchableWithoutFeedback, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { Button, Dialog, Portal, Surface, Text } from 'react-native-paper';
import { Container } from '../../../components/Container';
import { globalStyles } from '../../../styles/global';
import { GlobalContext } from '../../../contexts/globalContext';
import { primaryColor } from '../../../styles/theme';
import { Agenda as AgendaRNC, DateData } from 'react-native-calendars';
import LocaleConfig from '../../../utils/localeConfigCalendars';
import moment from 'moment';
import useCustomQuery from '../../../hooks/useCustomQuery';
import { useQueryClient } from '@tanstack/react-query';
import { formatDadosAgenda } from './functions/formatDadosAgenda';
import { StackScreenProps } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';

type Props = StackScreenProps<any>;

export default function SelecionaAgenda({ navigation }: Props) {
  new LocaleConfig();
  const queryClient = useQueryClient();
  const [dataSelecionada, setDataSelecionada] = useState<{
    [key: string]: any;
  }>({});
  const { agendaSelecionada, setAgendaSelecionada, dadosSelectsSelecionados } =
    useContext(GlobalContext);

  const renderEmptyData = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Nenhum horário disponível nessa data.</Text>
      </View>
    );
  };

  const customTheme = {
    agendaDayTextColor: primaryColor,
    agendaDayNumColor: primaryColor,
    agendaTodayColor: primaryColor,
    agendaKnobColor: primaryColor,
    selectedDayBackgroundColor: primaryColor,
    dotColor: primaryColor,
    todayTextColor: primaryColor,

    // backgroundColor: theme.colors.background,
    // calendarBackground: theme.colors.background,
    // textSectionTitleColor: theme.colors.onBackground,
    // selectedDayTextColor: theme.colors.onBackground,
    // todayBackgroundColor: theme.colors.primary,
    // dayTextColor: 'gray',
    // selectedDotColor: theme.colors.onBackground,
    // monthTextColor: theme.colors.onBackground,
  };

  const [messageDialog, setMessageDialog] = useState('');

  const hideDialog = () => setMessageDialog('');

  useEffect(() => {
    if (!agendaSelecionada?.dateString) {
      const dataAtual = moment();
      setDataSelecionada({
        year: dataAtual.year(),
        month: dataAtual.month() + 1,
        day: dataAtual.date(),
        dateString: dataAtual.format('YYYY-MM-DD'),
      });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setAgendaSelecionada({});
      setDataSelecionada({});
    });
    return unsubscribe;
  }, [navigation]);

  const datasFetch = useCustomQuery({
    key: 'datasFetchKey',
    endpoint: '/agenda/datas',
    params: {
      // intTipoAgendamentoId: '1',
      // intProfissionalId: '102',
      intTipoAgendamentoId: dadosSelectsSelecionados?.tipoAgendamentoId,
      intProfissionalId: dadosSelectsSelecionados?.profissionalId,
    },
  });

  const horasFetch = useCustomQuery({
    key: 'horasFetchKey',
    endpoint: '/agenda/horas',
    params: {
      datAgendamento:
        dataSelecionada?.dateString || moment().format('YYYY-MM-DD'),
      // intTipoAgendamentoId: '1',
      // intProfissionalId: '102',
      intTipoAgendamentoId: dadosSelectsSelecionados?.tipoAgendamentoId,
      intProfissionalId: dadosSelectsSelecionados?.profissionalId,
    },
  });

  const listaDatas = Array.isArray(datasFetch?.data)
    ? formatDadosAgenda(datasFetch.data)
    : {};

  return (
    <>
      <Portal>
        <Dialog visible={!!messageDialog} onDismiss={hideDialog}>
          <Dialog.Icon icon='alert' />
          <Dialog.Title style={{ textAlign: 'center' }}>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant='bodyMedium'>{messageDialog}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Container style={{ flex: 1, gap: 8 }}>
        <AgendaRNC
          items={listaDatas}
          showOnlySelectedDayItems={true}
          renderEmptyData={renderEmptyData}
          theme={customTheme}
          showClosingKnob={true}
          renderKnob={() => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
                marginTop: -4,
              }}
            >
              <Text style={{ color: '#999', fontSize: 12 }}>
                Arraste para visualizar mais datas
              </Text>
              <View style={{ marginTop: -8 }}>
                <AntDesign
                  name='caretdown'
                  size={18}
                  color={
                    agendaSelecionada?.dataAgenda ? primaryColor : '#189AB4'
                  }
                />
              </View>
            </View>
          )}
          displayLoadingIndicator={
            datasFetch.isFetching || horasFetch.isFetching
          }
          // onDayChange={(day: any) => {
          //   console.log(day)
          // }}
          onDayPress={(date: DateData) => {
            setDataSelecionada(date);
            setAgendaSelecionada({});
            setTimeout(() => {
              queryClient.invalidateQueries({ queryKey: ['horasFetchKey'] });
            }, 300);
          }}
          reservationsKeyExtractor={(item: any, index) => {
            return (
              String(item?.reservation?.profissional) +
              String(item?.reservation?.id) +
              String(index)
            );
          }}
          renderItem={(agenda: { [key: string]: any }, isFirst: boolean) => {
            return (
              <>
                {Array.isArray(horasFetch?.data) &&
                  horasFetch.data.map(
                    (hora: { [key: string]: any }, index: number) => (
                      <TouchableWithoutFeedback
                        key={index + hora?.horaAgenda}
                        onPress={() => {
                          setAgendaSelecionada((prev) => ({
                            ...prev,
                            ...agenda,
                            ...hora,
                          }));
                        }}
                      >
                        <Surface
                          elevation={1}
                          style={{
                            borderRadius: 12,
                            padding: 14,
                            marginVertical: 10,
                            marginTop: index == 0 ? 15 : 0,
                            // marginHorizontal: 10,
                            borderStyle: 'solid',
                            borderColor:
                              String(hora?.horaAgenda) ==
                              String(agendaSelecionada?.horaAgenda)
                                ? primaryColor
                                : 'transparent',
                            borderWidth: 2,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 8,
                            }}
                          >
                            <View style={{ flexDirection: 'column', gap: 4 }}>
                              <Text
                                style={{
                                  fontWeight: '600',
                                  fontSize: 14,
                                }}
                              >
                                <Text
                                  style={{
                                    fontWeight: '700',
                                  }}
                                >
                                  Profissional:
                                </Text>{' '}
                                {agenda.profissional}
                              </Text>
                              <Text style={{ fontSize: 14 }}>
                                <Text
                                  style={{
                                    fontWeight: '700',
                                  }}
                                >
                                  Data:
                                </Text>{' '}
                                {agenda?.dataAgenda} às {hora?.horaAgenda}
                              </Text>
                            </View>
                          </View>
                        </Surface>
                      </TouchableWithoutFeedback>
                    )
                  )}
              </>
            );
          }}
        />

        {/* {agendaSelecionada?.intDia && (
          <Surface
            elevation={1}
            style={{
              borderRadius: 12,
              padding: 14,
              marginVertical: 10,
              marginHorizontal: 10,
              borderStyle: 'solid',
              borderColor: primaryColor,
              borderWidth: 2,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <View style={{ flexDirection: 'column', gap: 4 }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: '700',
                    }}
                  >
                    Profissional:
                  </Text>{' '}
                  {agendaSelecionada.strProfissional}
                </Text>
                <Text style={{ fontSize: 14 }}>
                  <Text
                    style={{
                      fontWeight: '700',
                    }}
                  >
                    Hora:
                  </Text>{' '}
                  {agendaSelecionada.horaAgenda}
                </Text>
              </View>
            </View>
          </Surface>
        )} */}

        <Button
          mode='contained'
          style={globalStyles.button}
          // disabled={isLoading || !agendaSelecionada?.id}
          disabled={datasFetch.isFetching || horasFetch.isFetching}
          loading={datasFetch.isFetching || horasFetch.isFetching}
          onPress={() => {
            navigation.navigate('novaAgenda');
          }}
        >
          Selecionar
        </Button>
      </Container>
    </>
  );
}
