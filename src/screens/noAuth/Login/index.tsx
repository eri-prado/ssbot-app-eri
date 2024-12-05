import { StackScreenProps } from '@react-navigation/stack';
import { useContext, useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Container } from '../../../components/Container';
import { styles } from './styles';
import { primaryColor } from '../../../styles/theme';
import * as Crypto from 'expo-crypto';
import { GlobalContext } from '../../../contexts/globalContext';
import { setItemStorage } from '../../../helpers/setItemStorage';
import LogoSVG from '../../../../assets/logoSVG';
import { globalStyles } from '../../../styles/global';
import NovaConta from '../NovaConta';
import MaskInput, { Masks } from 'react-native-mask-input';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../../../services/api';
import Toast from 'react-native-toast-message';

type Props = StackScreenProps<any, 'login'>;

export default function LoginForm({ navigation }: Props) {
  const {
    setIsAuthenticated,
    setIsNewRegister,
    isNewRegister,
  } = useContext(GlobalContext);
  const [CPF, setCPF] = useState('');
  const [password, setPassword] = useState('');

  const authMutate = useMutation({
    mutationFn: (params: { [key: string]: any }) => {
      return api().post(
        'usuarios/autenticar',
        params
      );
    },
    onSuccess: (res) => {
      if (res.data.intAppUsuarioId) {
        setItemStorage('accessData', JSON.stringify(res.data));
        setIsAuthenticated(true);
        Toast.show({
          type: 'success',
          text1: "Usuário autenticado com sucesso!",
          position: 'bottom'
        });
      } else {
        Toast.show({
          type: 'error',
          text1: String(res),
          position: 'bottom'
        });
      }
    },
    onError: (err: any) => {
      if (err?.response?.data?.erro) {
        Toast.show({
          type: 'error',
          text1: String(err.response.data.erro),
          position: 'bottom'
        });
      }
    },
  });

  const handleSubmit = async () => {
    try {
      let senhaSha512: string | any;
      const sha512 = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA512,
        password
      );
      senhaSha512 = sha512;
      const params = {
        strCPF: CPF,
        strSenha: `0x${senhaSha512}`,
      };

      authMutate.mutate(params);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(error),
        position: 'bottom'
      });
    }
  };


  return (
    <Container>
      {isNewRegister ? (
        <NovaConta />
      ) : (
        <View style={styles.container}>
          <View style={styles.containerLogo}>
            {/* <Image source={imageWoman} style={styles.logo} /> */}
            <LogoSVG />
          </View>
          <View style={styles.containerInputs}>
            <TextInput
              keyboardType='numeric'
              style={globalStyles.input}
              label='CPF'
              placeholder='CPF'
              value={CPF}
              render={(props) => (
                <MaskInput
                  {...props}
                  value={CPF}
                  onChangeText={(masked, unmasked) => {
                    props.onChangeText?.(masked);
                    setCPF(unmasked);
                  }}
                  mask={Masks.BRL_CPF}
                />
              )}
            />
            <TextInput
              label='Senha'
              placeholder='Senha'
              style={globalStyles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.containerButtons}>
            <Button
              loading={authMutate.isPending}
              disabled={authMutate.isPending}
              mode='contained'
              onPress={handleSubmit}
              style={globalStyles.button}
            >
              Acessar
            </Button>
            <Button
              mode='outlined'
              onPress={() => setIsNewRegister(true)}
              theme={{ colors: { outline: primaryColor } }}
              style={globalStyles.button}
            >
              Criar nova conta
            </Button>
          </View>
        </View>
      )}
    </Container>
  );
}
