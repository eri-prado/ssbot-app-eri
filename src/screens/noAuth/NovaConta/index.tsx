import { useContext, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { Button, RadioButton, TextInput } from 'react-native-paper';
import { styles } from './styles';
import { primaryColor } from '../../../styles/theme';
import * as Crypto from 'expo-crypto';
import { GlobalContext } from '../../../contexts/globalContext';
import { globalStyles } from '../../../styles/global';
import api from '../../../services/api';
import axios from 'axios';
import { ICEP } from '../../../types/types';
import MaskInput, { Masks } from 'react-native-mask-input';
import { CEP_MASK } from '../../../utils/inputMasks';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { setItemStorage } from '../../../helpers/setItemStorage';

const mockNewRegister = {
  strAppUsuario: '',
  strBairro: '',
  strCEP: '',
  strCidade: '',
  strComplemento: '',
  strCPF: '',
  strCelular: '',
  datNascimento: '',
  // email: '',
  strEndereco: '',
  strEstado: '',
  strNumero: '',
  strPlataforma: '',
  strSenha: '',
  strSexo: '',
};

export default function NovaConta() {
  const { setIsNewRegister, userData, setIsAuthenticated } =
    useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);

  const [dadosNewRegister, setDadosNewRegister] = useState(mockNewRegister);
  const [steps, setSteps] = useState(0);

  const [senha, setSenha] = useState('');

  const userMutate = useMutation({
    mutationFn: (params: { [key: string]: any }) => {
      return api().post('usuarios', params);
    },
    onSuccess: (res) => {
      if ((res.data.type = 'success')) {
        Toast.show({
          type: 'success',
          text1: String('Usuário criado com sucesso!'),
          position: 'bottom',
        });
        resetEnderecoCep();
        fnAuth();
      } else {
        Toast.show({
          type: 'error',
          text1: String(String(res.data.message)),
          position: 'bottom',
        });
      }
    },
    onError: (err: any) => {
      if (err?.response?.data?.erro) {
        Toast.show({
          type: 'error',
          text1: String(err.response.data.erro),
          position: 'bottom',
        });
      }
    },
  });

  const handleSubmit = async () => {
    try {
      const sha512 = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA512,
        dadosNewRegister.strSenha
      );
      const params = {
        ...dadosNewRegister,
        datNascimento: moment(
          dadosNewRegister.datNascimento,
          'DD/MM/YYYY'
        ).format('YYYY-MM-DD'),
        strSenha: dadosNewRegister.strSenha ? `0x${sha512}` : '',
      };

      userMutate.mutate(params);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(String(error)),
        position: 'bottom',
      });
    }
  };

  function resetEnderecoCep() {
    setDadosNewRegister((prev) => ({
      ...prev,
      strBairro: '',
      strCidade: '',
      strEstado: '',
      strComplemento: '',
      strEndereco: '',
    }));
  }

  const handlePressGetCep = async () => {
    if (dadosNewRegister.strCEP.length !== 8) {
      resetEnderecoCep();
      Toast.show({
        type: 'error',
        text1: 'O CEP deve ter 8 dígitos.',
        position: 'bottom',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${dadosNewRegister.strCEP}/json/`
      );
      const data = response.data;
      if (data.erro) {
        Toast.show({
          type: 'error',
          text1: 'CEP não encontrado.',
          position: 'bottom',
        });
        resetEnderecoCep();
      } else {
        const dadosCep: ICEP = data;
        setDadosNewRegister((prev) => ({
          ...prev,
          strBairro: decodeURI(dadosCep.bairro),
          strCidade: dadosCep.localidade,
          strEstado: dadosCep.uf,
          strComplemento: dadosCep.complemento,
          strEndereco: dadosCep.logradouro,
        }));
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao buscar o CEP.',
        position: 'bottom',
      });
      resetEnderecoCep();
    } finally {
      setIsLoading(false);
    }
  };

  const Indicator = (activeIndex: { activeIndex: number }) => {
    return (
      <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
        {[0, 1, 2].map((index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === activeIndex.activeIndex
                ? styles.activeIndicator
                : styles.inactiveIndicator,
              ,
            ]}
          ></View>
        ))}
      </View>
    );
  };

  const authMutate = useMutation({
    mutationFn: (params: { [key: string]: any }) => {
      return api().post('usuarios/autenticar', params);
    },
    onSuccess: (res) => {
      if (res.data.intAppUsuarioId) {
        setItemStorage('accessData', JSON.stringify(res.data));
        setIsAuthenticated(true);
        Toast.show({
          type: 'success',
          text1: 'Usuário autenticado com sucesso!',
          position: 'bottom',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: String(res),
          position: 'bottom',
        });
      }
    },
    onError: (err: any) => {
      if (err?.response?.data?.erro) {
        Toast.show({
          type: 'error',
          text1: String(err.response.data.erro),
          position: 'bottom',
        });
      }
    },
  });

  const fnAuth = async () => {
    try {
      let senhaSha512: string | any;
      const sha512 = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA512,
        dadosNewRegister.strSenha
      );
      senhaSha512 = sha512;
      const params = {
        strCPF: dadosNewRegister.strCPF,
        strSenha: `0x${senhaSha512}`,
      };

      authMutate.mutate(params);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: String(error),
        position: 'bottom',
      });
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {steps == 0 && (
            <>
              <View style={styles.containerLogo}>
                <Text style={styles.title}>Informações Pessoais</Text>
              </View>
              <Indicator activeIndex={steps} />
              <View style={styles.containerInputs}>
                <TextInput
                  style={globalStyles.input}
                  label='Nome'
                  placeholder='Nome'
                  value={dadosNewRegister.strAppUsuario}
                  onChangeText={(value) =>
                    setDadosNewRegister((prev) => ({
                      ...prev,
                      strAppUsuario: value,
                    }))
                  }
                  autoCapitalize='none'
                />
                <TextInput
                  keyboardType='numeric'
                  label='CPF'
                  placeholder='CPF'
                  style={globalStyles.input}
                  value={dadosNewRegister.strCPF}
                  render={(props) => (
                    <MaskInput
                      {...props}
                      value={dadosNewRegister.strCPF}
                      onChangeText={(masked, unmasked) => {
                        props.onChangeText?.(masked);
                        setDadosNewRegister((prev) => ({
                          ...prev,
                          strCPF: unmasked,
                        }));
                      }}
                      mask={Masks.BRL_CPF}
                    />
                  )}
                />

                <TextInput
                  keyboardType='numeric'
                  label='Data de Nascimento'
                  placeholder='Data de Nascimento'
                  style={globalStyles.input}
                  value={dadosNewRegister.datNascimento}
                  render={(props) => (
                    <MaskInput
                      {...props}
                      value={dadosNewRegister.datNascimento}
                      onChangeText={(masked, unmasked) => {
                        props.onChangeText?.(masked);
                        setDadosNewRegister((prev) => ({
                          ...prev,
                          datNascimento: masked,
                        }));
                      }}
                      mask={Masks.DATE_DDMMYYYY}
                    />
                  )}
                />

                <TextInput
                  keyboardType='numeric'
                  label='Celular'
                  placeholder='Celular'
                  style={globalStyles.input}
                  value={dadosNewRegister.strCelular}
                  render={(props) => (
                    <MaskInput
                      {...props}
                      value={dadosNewRegister.strCelular}
                      onChangeText={(masked, unmasked) => {
                        props.onChangeText?.(masked);
                        setDadosNewRegister((prev) => ({
                          ...prev,
                          strCelular: unmasked,
                        }));
                      }}
                      mask={Masks.BRL_PHONE}
                    />
                  )}
                />

                {/* <TextInput
                keyboardType='email-address'
                label='E-mail'
                placeholder='E-mail'
                style={globalStyles.input}
                value={dadosNewRegister.email}
                onChangeText={(value) =>
                  setDadosNewRegister((prev) => ({ ...prev, email: value }))
                }
              /> */}
                <RadioButton.Group
                  onValueChange={(value) =>
                    setDadosNewRegister((prev) => ({ ...prev, strSexo: value }))
                  }
                  value={dadosNewRegister.strSexo}
                >
                  <RadioButton.Item label='Feminino' value='feminino' />
                  <RadioButton.Item label='Masculino' value='masculino' />
                </RadioButton.Group>
              </View>
              <View style={styles.containerButtons}>
                <Button
                  mode='contained'
                  onPress={() => setSteps(1)}
                  style={globalStyles.button}
                >
                  Próximo
                </Button>
                <Button
                  mode='outlined'
                  onPress={() => {
                    setIsNewRegister(false);
                  }}
                  theme={{ colors: { outline: primaryColor } }}
                  style={globalStyles.button}
                >
                  Já possuo uma conta
                </Button>
              </View>
            </>
          )}
          {steps == 1 && (
            <>
              <View style={styles.containerLogo}>
                <Text style={styles.title}>Endereço</Text>
              </View>
              <Indicator activeIndex={steps} />
              <View style={styles.containerInputs}>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <TextInput
                    keyboardType='numeric'
                    style={{ ...globalStyles.input, width: '60%' }}
                    label='CEP'
                    placeholder='CEP'
                    value={dadosNewRegister.strCEP}
                    onChangeText={(value) =>
                      setDadosNewRegister((prev) => ({
                        ...prev,
                        strCEP: value,
                      }))
                    }
                    render={(props) => (
                      <MaskInput
                        {...props}
                        value={dadosNewRegister.strCEP}
                        onChangeText={(masked, unmasked) => {
                          props.onChangeText?.(masked);
                          setDadosNewRegister((prev) => ({
                            ...prev,
                            strCEP: unmasked,
                          }));
                        }}
                        mask={CEP_MASK}
                      />
                    )}
                  />
                  <Button
                    mode='outlined'
                    onPress={handlePressGetCep}
                    loading={isLoading}
                    style={{ ...globalStyles.button, flexGrow: 1, height: 50 }}
                  >
                    Buscar
                  </Button>
                </View>
                <TextInput
                  label='Endereço'
                  placeholder='Endereço'
                  style={globalStyles.input}
                  value={dadosNewRegister.strEndereco}
                  onChangeText={(value) =>
                    setDadosNewRegister((prev) => ({
                      ...prev,
                      strEndereco: value,
                    }))
                  }
                />

                <TextInput
                  label='Número'
                  placeholder='Número'
                  style={globalStyles.input}
                  value={dadosNewRegister.strNumero}
                  onChangeText={(value) =>
                    setDadosNewRegister((prev) => ({
                      ...prev,
                      strNumero: value,
                    }))
                  }
                />

                <TextInput
                  label='Complemento'
                  placeholder='Complemento'
                  style={globalStyles.input}
                  value={dadosNewRegister.strComplemento}
                  onChangeText={(value) =>
                    setDadosNewRegister((prev) => ({
                      ...prev,
                      strComplemento: value,
                    }))
                  }
                />

                <TextInput
                  label='Bairro'
                  placeholder='Bairro'
                  style={globalStyles.input}
                  value={dadosNewRegister.strBairro}
                  onChangeText={(value) =>
                    setDadosNewRegister((prev) => ({
                      ...prev,
                      strBairro: value,
                    }))
                  }
                />
                <TextInput
                  label='Cidade'
                  placeholder='Cidade'
                  style={globalStyles.input}
                  value={dadosNewRegister.strCidade}
                  onChangeText={(value) =>
                    setDadosNewRegister((prev) => ({
                      ...prev,
                      strCidade: value,
                    }))
                  }
                />
                <TextInput
                  label='Estado'
                  placeholder='Estado'
                  style={globalStyles.input}
                  value={dadosNewRegister.strEstado}
                  onChangeText={(value) =>
                    setDadosNewRegister((prev) => ({
                      ...prev,
                      strEstado: value,
                    }))
                  }
                />
              </View>
              <View style={styles.containerButtons}>
                <Button
                  mode='contained'
                  onPress={() => setSteps(2)}
                  style={globalStyles.button}
                >
                  Próximo
                </Button>
                <Button
                  mode='outlined'
                  onPress={() => setSteps(0)}
                  theme={{ colors: { outline: primaryColor } }}
                  style={globalStyles.button}
                >
                  Voltar
                </Button>
              </View>
            </>
          )}
          {steps == 2 && (
            <>
              <View style={styles.containerLogo}>
                <Text style={styles.title}>Senha</Text>
              </View>
              <Indicator activeIndex={steps} />
              <View style={styles.containerInputs}>
                <TextInput
                  label='Senha'
                  placeholder='Senha'
                  style={globalStyles.input}
                  value={senha}
                  onChangeText={(value) => setSenha(value)}
                  secureTextEntry
                />

                <TextInput
                  label='Confirmar Senha'
                  placeholder='Confirmar Senha'
                  style={globalStyles.input}
                  value={dadosNewRegister.strSenha}
                  onChangeText={(value) =>
                    setDadosNewRegister((prev) => ({
                      ...prev,
                      strSenha: value,
                    }))
                  }
                  secureTextEntry
                />
              </View>
              <View style={styles.containerButtons}>
                <Button
                  mode='contained'
                  onPress={handleSubmit}
                  style={globalStyles.button}
                  loading={userMutate.isPending || authMutate.isPending}
                  disabled={userMutate.isPending || authMutate.isPending}
                >
                  Salvar
                </Button>
                <Button
                  mode='outlined'
                  onPress={() => setSteps(1)}
                  theme={{ colors: { outline: primaryColor } }}
                  style={globalStyles.button}
                >
                  Voltar
                </Button>
              </View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </KeyboardAwareScrollView>
  );
}
