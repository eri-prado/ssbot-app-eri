import { View } from 'react-native';
import { Container } from '../../../components/Container';
import { Button, TextInput } from 'react-native-paper';
import { globalStyles } from '../../../styles/global';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../../contexts/globalContext';
import { useMutation } from '@tanstack/react-query';
import api from '../../../services/api';
import Toast from 'react-native-toast-message';
import { NavigationProp } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';

interface IAlterarSenhaProps {
  navigation: NavigationProp<any>;
}

export default function AlterarSenha({ navigation }: IAlterarSenhaProps) {
  const { userData } = useContext(GlobalContext);
  const [inputOldPassword, setInputOldPassword] = useState('');
  const [inputNewPassword, setInputNewPassword] = useState('');

  const userMutate = useMutation({
    mutationFn: (params: { [key: string]: any }) => {
      return api(userData?.strToken).patch('usuarios/senha', params);
    },
    onSuccess: (res) => {
      if ((res.data.type = 'success')) {
        Toast.show({
          type: 'success',
          text1: String('Senha alterada com sucesso!'),
          position: 'bottom',
        });
        setInputOldPassword('');
        setInputNewPassword('');
        navigation.navigate('Perfil');
      } else {
        Toast.show({
          type: 'error',
          text1: String(res.data),
          position: 'bottom',
        });
      }
    },
    onError: (err: any) => {
      if (err?.response?.data?.erro || err?.message) {
        Toast.show({
          type: 'error',
          text1: String(err.response.data.erro || err.message),
          position: 'bottom',
        });
      }
    },
  });

  const onSubmit = async () => {
    try {
      const sha512Old = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA512,
        inputOldPassword
      );

      const sha512New = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA512,
        inputNewPassword
      );

      const params = {
        strSenha: inputNewPassword ? `0x${sha512Old}` : '',
        strSenhaNova: inputNewPassword ? `0x${sha512New}` : '',
      };

      userMutate.mutate(params);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(error),
        position: 'bottom',
      });
    }
  };

  return (
    <Container style={{ gap: 16 }}>
      <TextInput
        theme={{ roundness: 30 }}
        mode='outlined'
        label={'Senha Antiga'}
        placeholder=''
        value={inputOldPassword}
        onChangeText={(value) => setInputOldPassword(value)}
        secureTextEntry
      />

      <TextInput
        theme={{ roundness: 30 }}
        mode='outlined'
        label={'Nova Senha'}
        placeholder=''
        value={inputNewPassword}
        onChangeText={(value) => setInputNewPassword(value)}
        secureTextEntry
      />

      <View style={{ justifyContent: 'center' }}>
        <Button
          mode='contained'
          disabled={userMutate.isPending}
          loading={userMutate.isPending}
          onPress={onSubmit}
          style={globalStyles.button}
        >
          Salvar Dados
        </Button>
      </View>
    </Container>
  );
}
