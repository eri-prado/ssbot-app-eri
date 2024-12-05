import { Platform, Pressable, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import { removeItemStorage } from '../../../helpers/removeItemStorage';
import { GlobalContext } from '../../../contexts/globalContext';
import { useContext, useState } from 'react';
import { globalStyles } from '../../../styles/global';
import { Container } from '../../../components/Container';
import Feather from '@expo/vector-icons/Feather';
import { primaryColor } from '../../../styles/theme';
import { styles } from './styles';
import CustomAlert from '../../../components/CustomAlert';
import Toast from 'react-native-toast-message';
import { useMutation } from '@tanstack/react-query';
import api from '../../../services/api';

export default function Perfil({ navigation }: any) {
  const { userData, setUserData, setIsAuthenticated } =
    useContext(GlobalContext);

  const [visible, setVisible] = useState(false);

  const closeAlert = () => setVisible(false);

  const deleteUserMutate = useMutation({
    mutationFn: () => {
      return api(userData?.strToken).delete('usuarios', {});
    },
    onSuccess: (res) => {
      if ((res.data.type = 'success')) {
        closeAlert();
        Toast.show({
          type: 'success',
          text1: 'Dados excluídos com sucesso!',
          position: 'bottom'
        });
        setUserData(null);
        setIsAuthenticated(false);
        removeItemStorage('accessData');
      } else {
        Toast.show({
          type: 'error',
          text1: String(res.data.message),
          position: 'bottom'
        });
      }
    },
    onError: (err: any) => {
      if (err.message) {
        Toast.show({
          type: 'error',
          text1: String(err.message),
          position: 'bottom'
        });
      }
    },
  });

  return (
    <>
      <CustomAlert
        icon='warning'
        open={visible}
        closeAlert={closeAlert}
        title={"Atenção!"}
        content={(<Text style={{ textAlign: 'center' }} variant='bodyMedium'>Deseja excluir sua conta?</Text>)}
        actions={
          <>
            <Button onPress={closeAlert}>Cancelar</Button>
            <Button loading={deleteUserMutate.isPending} disabled={deleteUserMutate.isPending} onPress={() => {
              deleteUserMutate.mutate();
            }}>Confirmar</Button>
          </>
        }
      />

      <Container style={{ gap: 16, marginTop: Platform.OS === 'ios' ? 24 : 8 }}>
        <Pressable
          onPress={() => navigation.navigate('minhaConta')}
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Text style={styles.textOption}>Minha Conta</Text>
          <Feather name='arrow-right' size={24} color='#666' />
        </Pressable>
        <Divider />
        <Pressable
          onPress={() => navigation.navigate('alterarSenha')}
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Text style={styles.textOption}>Alterar Senha</Text>
          <Feather name='arrow-right' size={24} color='#666' />
        </Pressable>
        <Divider />
        <View style={{ justifyContent: 'center' }}>
          <Button
            mode='outlined'
            onPress={() => {
              removeItemStorage('accessData');
              setIsAuthenticated(false);
            }}
            theme={{ colors: { outline: primaryColor } }}
            style={globalStyles.button}
          >
            Sair da Conta
          </Button>
          <Button
            mode='outlined'
            onPress={() => setVisible(true)}
            theme={{ colors: { outline: 'transparent' } }}
            style={globalStyles.button}
          >
            Excluir conta
          </Button>
        </View>
      </Container>
    </>
  );
}
