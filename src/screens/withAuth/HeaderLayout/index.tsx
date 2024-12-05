import { Pressable, Text, View } from 'react-native';
import { Container } from '../../../components/Container';
import IconNotificacao from '../../../../assets/icons/IconNotificacao';
import { styles } from './styles';
import { primaryColor } from '../../../styles/theme';
import { useContext, useEffect } from 'react';
import { getItemStorage } from '../../../helpers/getItemStorage';
import { GlobalContext } from '../../../contexts/globalContext';
import { NavigationProp } from '@react-navigation/native';
import { Badge } from 'react-native-paper';
import useCustomQuery from '../../../hooks/useCustomQuery';

interface IHeaderLayout {
  navigation: NavigationProp<any>;
}

export default function HeaderLayout({ navigation }: IHeaderLayout) {
  const { userData, setUserData } = useContext(GlobalContext);

  useEffect(() => {
    (async function getUserData() {
      const dados = await getItemStorage('accessData');

      if (dados) {
        setUserData(JSON.parse(dados));
      }
    })();
  }, []);

  const notificacoesFetch = useCustomQuery({
    key: 'notificacoesKey',
    endpoint: '/usuarios/notificacoes',
    params: {},
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Container>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexGrow: 1,
              marginTop: 32,
            }}
          >
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
              onPress={() => navigation.navigate('Perfil')}
            >
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 36,
                  width: 36,
                  backgroundColor: '#fff',
                  borderRadius: 100,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: primaryColor,
                  }}
                >
                  {userData?.strAppUsuario?.slice(0, 2).toUpperCase()}
                </Text>
              </View>
              <View style={{ gap: 1 }}>
                <Text style={{ color: '#fff', fontSize: 14 }}>
                  Olá, bem-vindo(a)!
                </Text>
                <Text
                  style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}
                >
                  {userData?.strAppUsuario?.toUpperCase()}
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('notificacoes')}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 8,
                  borderColor: '#ffffff7a',
                }}
              >
                <View>
                  {Array.isArray(notificacoesFetch.data) &&
                    notificacoesFetch.data.length > 0 && (
                      <Badge
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}
                        size={12}
                      ></Badge>
                    )}
                  <View style={{ zIndex: -1 }}>
                    <IconNotificacao />
                  </View>
                </View>
              </View>
            </Pressable>
          </View>
        </Container>
      </View>
    </View>
  );
}
