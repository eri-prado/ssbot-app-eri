import { TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { Button, Text, TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { Container } from '../../../components/Container';
import { globalStyles } from '../../../styles/global';
import { GlobalContext } from '../../../contexts/globalContext';
import { styles } from './styles';
import api from '../../../services/api';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { primaryColor } from '../../../styles/theme';
import useCustomQuery from '../../../hooks/useCustomQuery';
import { formatarDadosSelect } from '../../../utils/formatarDadosSelect';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes';
import MaskInput, { Masks } from 'react-native-mask-input';

const mockDadosSelect = {
  convenioId: null,
  tipoAgendamentoId: null,
  especialidadeId: null,
  profissionalId: null,
};

type Props = StackScreenProps<any>;

export default function NovaAgenda({ navigation }: Props) {
  const {
    userData,
    agendaSelecionada,
    setAgendaSelecionada,
    dadosSelectsSelecionados,
    setDadosSelectsSelecionados,
  } = useContext(GlobalContext);

  const queryClient = useQueryClient();

  const { control, setValue, handleSubmit } = useForm<any>();

  const convenioFetch = useCustomQuery({
    key: 'conveniosFetchKey',
    endpoint: '/convenios',
    params: {},
  });

  const tiposAgendaFetch = useCustomQuery({
    key: 'tiposAgendaFetchKey',
    endpoint: '/agenda/tipos',
    params: {},
  });

  const especialidadeFetch = useCustomQuery({
    key: 'especialidadeFetchKey',
    endpoint: '/agenda/especialidades',
    params: {
      intTipoAgendamentoId: dadosSelectsSelecionados?.tipoAgendamentoId || 0,
      intConvenioId: dadosSelectsSelecionados?.convenioId || 0,
    },
    enabled: !!dadosSelectsSelecionados?.tipoAgendamentoId && !!dadosSelectsSelecionados?.convenioId
  });

  const profissionalFetch = useCustomQuery({
    key: 'profissionalFetchKey',
    endpoint: '/agenda/profissionais',
    params: {
      intTipoAgendamentoId: dadosSelectsSelecionados?.tipoAgendamentoId || 0,
      intConvenioId: dadosSelectsSelecionados?.convenioId || 0,
      intEspecialidadeId: dadosSelectsSelecionados?.especialidadeId || 0,
    },
    enabled:
      !!dadosSelectsSelecionados?.tipoAgendamentoId &&
      !!dadosSelectsSelecionados?.convenioId
  });

  const listaConvenios = Array.isArray(convenioFetch?.data)
    ? formatarDadosSelect('intConvenioId', 'strConvenio', convenioFetch.data)
    : [];

  const listaTiposAgenda = Array.isArray(tiposAgendaFetch?.data)
    ? formatarDadosSelect(
        'intTipoAgendamentoId',
        'strTipoAgendamento',
        tiposAgendaFetch.data
      )
    : [];

  const listaEspecialidades = Array.isArray(especialidadeFetch?.data)
    ? formatarDadosSelect(
        'intEspecialidadeMedicaId',
        'strEspecialidadeMedica',
        especialidadeFetch.data
      )
    : [];

  const listaProfissionais = Array.isArray(profissionalFetch?.data)
    ? formatarDadosSelect(
        'intProfissionalId',
        'strProfissional',
        profissionalFetch.data
      )
    : [];

  function resetSelects() {
    setDadosSelectsSelecionados(mockDadosSelect);
  }

  const agendarMutate = useMutation({
    mutationFn: (params: { [key: string]: any }) => {
      return api(userData?.strToken).post('agenda', params);
    },
    onSuccess: (res) => {
      if ((res.data.type = 'success')) {
        Toast.show({
          type: 'success',
          text1: String('Agendamento realizado com sucesso!'),
          position: 'bottom',
        });
        resetSelects();
        setAgendaSelecionada({});
        queryClient.invalidateQueries({ queryKey: ['agendamentosKey'] });
        navigation.navigate('Agenda');
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

  useEffect(() => {
    if (userData) {
      setValue('strAgenda', userData.strAppUsuario);
      setValue('strCPF', userData.strCPF);
      setValue('datNascimento', userData.datNascimento?.split(' ')[0]);
      setValue('strTelefone', userData.strCelular);
      setValue('strEmail', userData.strEmail);
    }
    resetSelects();
  }, []);

  const onSubmit = (data: any) => {
    try {
      const params = {
        ...data,
        strCPF: data?.strCPF.replace(/\D/g, ''),
        strTelefone: data?.strTelefone.replace(/\D/g, ''),
        intConvenioId: dadosSelectsSelecionados?.convenioId,
        intTipoAgendamentoId: dadosSelectsSelecionados?.tipoAgendamentoId,
        intEspecialidadeId: dadosSelectsSelecionados?.especialidadeId,
        intProfissionalId: dadosSelectsSelecionados?.profissionalId,
        datAgendamento: `${moment(
          agendaSelecionada?.dataAgenda,
          'DD/MM/YYYY'
        ).format('YYYY-MM-DD')} ${agendaSelecionada?.horaAgenda}`,
        // intAgendaId: '',
      };

      agendarMutate.mutate(params);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(error),
        position: 'bottom',
      });
    }
  };

  function removeFocusTextInput() {
    Keyboard.dismiss();
  }

  return (
    <>
      <Container style={{ flex: 1, gap: 8 }}>
        <Controller
          name='strAgenda'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextInput
              theme={{ roundness: 30 }}
              mode='outlined'
              label={'Nome Completo'}
              onBlur={field.onBlur}
              value={field.value}
              onChangeText={(value) => field.onChange(value)}
            />
          )}
        />
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <Controller
            name='strCPF'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextInput
                keyboardType='numeric'
                theme={{ roundness: 30 }}
                mode='outlined'
                label={'CPF'}
                style={{ width: '49%' }}
                onBlur={field.onBlur}
                value={field.value}
                render={(props) => (
                  <MaskInput
                    {...props}
                    value={field.value}
                    onChangeText={(masked, unmasked) => {
                      props.onChangeText?.(masked);
                      field.onChange(unmasked);
                    }}
                    mask={Masks.BRL_CPF}
                  />
                )}
              />
            )}
          />

          <Controller
            name='datNascimento'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextInput
                keyboardType='numeric'
                theme={{ roundness: 30 }}
                mode='outlined'
                style={{ width: '50%' }}
                label={'Data Nascimento'}
                onBlur={field.onBlur}
                value={field.value}
                render={(props) => (
                  <MaskInput
                    {...props}
                    value={field.value}
                    onChangeText={(masked, unmasked) => {
                      props.onChangeText?.(masked);
                      field.onChange(unmasked);
                    }}
                    mask={Masks.DATE_DDMMYYYY}
                  />
                )}
              />
            )}
          />
        </View>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <Controller
            name='strTelefone'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextInput
                keyboardType='numeric'
                theme={{ roundness: 30 }}
                mode='outlined'
                style={{ width: '49%' }}
                label={'Telefone'}
                onBlur={field.onBlur}
                value={field.value}
                render={(props) => (
                  <MaskInput
                    {...props}
                    value={field.value}
                    onChangeText={(masked, unmasked) => {
                      props.onChangeText?.(masked);
                      field.onChange(unmasked);
                    }}
                    mask={Masks.BRL_PHONE}
                  />
                )}
              />
            )}
          />

          <Controller
            name='strEmail'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextInput
                keyboardType='email-address'
                theme={{ roundness: 30 }}
                mode='outlined'
                style={{ width: '49%' }}
                label={'Email'}
                onBlur={field.onBlur}
                value={field.value}
                onChangeText={(value) => field.onChange(value)}
              />
            )}
          />
        </View>

        <View style={styles.select}>
          <RNPickerSelect
            placeholder={{ label: 'Selecione um Convênio', value: null }}
            onValueChange={(value) => {
              removeFocusTextInput();
              if (value !== null) {
                setDadosSelectsSelecionados({
                  convenioId: value,
                  tipoAgendamentoId: null,
                  especialidadeId: null,
                  profissionalId: null,
                });
              } else {
                setDadosSelectsSelecionados({
                  convenioId: null,
                  tipoAgendamentoId: null,
                  especialidadeId: null,
                  profissionalId: null,
                });
              }
            }}
            items={listaConvenios}
            value={dadosSelectsSelecionados?.convenioId}
          />
        </View>
        <View style={styles.select}>
          <RNPickerSelect
            placeholder={{
              label: 'Selecione um Tipo de Agendamento',
              value: null,
            }}
            onValueChange={(value) => {
              removeFocusTextInput();
              if (value !== null) {
                setDadosSelectsSelecionados((prev) => ({
                  ...prev,
                  tipoAgendamentoId: value,
                  especialidadeId: null,
                  profissionalId: null,
                }));
                // setTipoAgendamentoId(String(value));
                // getEspecialidades({
                //   convenioId: convenioId,
                //   tipoAgendamentoId: value,
                // });
              }
            }}
            items={listaTiposAgenda}
            value={dadosSelectsSelecionados?.tipoAgendamentoId}
          />
        </View>
        <View style={styles.select}>
          <RNPickerSelect
            placeholder={{
              label: 'Selecione uma Especialidade',
              value: null,
            }}
            onValueChange={(value) => {
              removeFocusTextInput();
              // resetStates3();
              if (value !== null) {
                setDadosSelectsSelecionados((prev) => ({
                  ...prev,
                  especialidadeId: value,
                  profissionalId: null,
                }));

                // setEspecialidadeMedicaId(String(value));
                // getProfissionais({
                //   convenioId: convenioId,
                //   tipoAgendamentoId: tipoAgendamentoId,
                //   especialidadeMedicaId: value,
                // });
              }
            }}
            items={listaEspecialidades}
            value={dadosSelectsSelecionados?.especialidadeId}
          />
        </View>
        <View style={styles.select}>
          <RNPickerSelect
            placeholder={{
              label: 'Selecione um Profissional',
              value: null,
            }}
            onValueChange={(value) => {
              removeFocusTextInput();
              if (value !== null) {
                setDadosSelectsSelecionados((prev) => ({
                  ...prev,
                  profissionalId: value,
                }));
              }
            }}
            items={listaProfissionais}
            value={dadosSelectsSelecionados?.profissionalId}
          />
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (
                !dadosSelectsSelecionados?.convenioId ||
                !dadosSelectsSelecionados?.especialidadeId ||
                !dadosSelectsSelecionados?.profissionalId ||
                !dadosSelectsSelecionados?.tipoAgendamentoId
              ) {
                Toast.show({
                  type: 'info',
                  text1: 'Atenção! Preencha todos os campos.',
                  position: 'bottom',
                });
                return;
              }
              navigation.navigate('selecionaData');
            }}
            style={{ flexGrow: 1, width: '40%' }}
          >
            <View
              style={{
                ...styles.select,
                width: '100%',
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 8,
              }}
            >
              <FontAwesome6
                name='calendar-plus'
                size={18}
                color={agendaSelecionada?.dataAgenda ? primaryColor : '#999'}
              />
              <Text
                style={{
                  color: agendaSelecionada?.dataAgenda ? primaryColor : '#999',
                  fontWeight: '700',
                }}
              >
                {agendaSelecionada?.dataAgenda
                  ? `${agendaSelecionada.dataAgenda} às ${agendaSelecionada.horaAgenda}`
                  : 'Selecionar Data e Hora'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Button
          mode='contained'
          style={globalStyles.button}
          loading={
            convenioFetch.isFetching ||
            tiposAgendaFetch.isFetching ||
            agendarMutate?.isPending
          }
          disabled={
            convenioFetch.isFetching ||
            tiposAgendaFetch.isFetching ||
            agendarMutate?.isPending
          }
          onPress={handleSubmit(onSubmit)}
        >
          Agendar
        </Button>
      </Container>
    </>
  );
}
