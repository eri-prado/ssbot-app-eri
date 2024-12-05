import { View } from 'react-native';
import { Container } from '../../../components/Container';
import { Button, TextInput } from 'react-native-paper';
import { globalStyles } from '../../../styles/global';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../contexts/globalContext';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import api from '../../../services/api';
import { setItemStorage } from '../../../helpers/setItemStorage';
import MaskInput, { Masks } from 'react-native-mask-input';
import moment from 'moment';
import Toast from 'react-native-toast-message';

export default function MinhaConta({ navigation }: any) {
  const { userData, setUserData } = useContext(GlobalContext);
  const { control, setValue, handleSubmit } = useForm<any>();

  const userMutate = useMutation({
    mutationFn: (params: { [key: string]: any }) => {
      return api(userData?.strToken).put('usuarios', params);
    },
    onSuccess: (res) => {
      const params = JSON.parse(res.config.data);
      if ((res.data.type = 'success')) {
        Toast.show({
          type: 'success',
          text1: String('Dados alterados com sucesso!'),
          position: 'bottom',
        });

        setItemStorage(
          'accessData',
          JSON.stringify({ ...userData, ...params })
        );
        setUserData((prev) => ({ ...prev, ...params }));
      } else {
        Toast.show({
          type: 'error',
          text1: String(res.data.message),
          position: 'bottom',
        });
      }
    },
    onError: (err: any) => {
      if (err.message) {
        Toast.show({
          type: 'error',
          text1: String(err.message),
          position: 'bottom',
        });
      }
    },
  });

  const onSubmit = (data: any) => {
    try {
      const newParams = {
        ...data,
        datNascimento: data.datNascimento
          ? moment(data.datNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD')
          : '',
        intAppUsuarioId: userData?.intAppUsuarioId,
      };

      userMutate.mutate(newParams);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(error),
        position: 'bottom',
      });
    }
  };

  useEffect(() => {
    if (userData) {
      setValue('strAppUsuario', userData.strAppUsuario);
      setValue('strCPF', userData.strCPF);
      setValue(
        'datNascimento',
        userData.datNascimento
          ? moment(userData.datNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY')
          : ''
      );
      setValue('strCelular', userData.strCelular);
    }
  }, []);

  return (
    <Container style={{ gap: 16 }}>
      <Controller
        name='strAppUsuario'
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
            label={'Data de Nascimento'}
            onBlur={field.onBlur}
            value={field.value}
            render={(props) => (
              <MaskInput
                {...props}
                value={field.value}
                mask={Masks.DATE_DDMMYYYY}
              />
            )}
            onChangeText={(value) => field.onChange(value)}
          />
        )}
      />
      <Controller
        name='strCelular'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <TextInput
            keyboardType='numeric'
            theme={{ roundness: 30 }}
            mode='outlined'
            label={'Celular'}
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
      <View style={{ justifyContent: 'center' }}>
        <Button
          mode='contained'
          disabled={userMutate.isPending}
          loading={userMutate.isPending}
          onPress={handleSubmit(onSubmit)}
          style={globalStyles.button}
        >
          Salvar Dados
        </Button>
      </View>
    </Container>
  );
}
