import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Container } from '../../../components/Container';
import { NavigationProp } from '@react-navigation/native';
import { useLaudos } from './hooks/useLaudos';
import { styles } from './styles';
import { ActivityIndicator, Surface } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import IconExame from '../../../../assets/icons/IconExame';
import useCustomQuery from '../../../hooks/useCustomQuery';
import { useQueryClient } from '@tanstack/react-query';
import { IExames } from './types';
import moment from 'moment';
import { useState } from 'react';
import { shareFilePDF } from '../../../helpers/shareFilePDF';
import Toast from 'react-native-toast-message';

interface ILaudosProps {
  navigation: NavigationProp<any>;
}

export default function Exames({ navigation }: ILaudosProps) {
  const { getLaudos } = useLaudos();
  const [exameSelecionado, setExameSelecionado] = useState<null | IExames>(
    null
  );

  const queryClient = useQueryClient();

  const examesFetch = useCustomQuery({
    key: 'examesKey',
    endpoint: '/usuarios/exames',
    params: {},
  });

  const downloadExameFetch = useCustomQuery({
    key: 'examesDownloadKey',
    endpoint: `/usuarios/exames/${exameSelecionado?.intLaudoClienteId}/download`,
    params: {},
    enabled: !!exameSelecionado?.intLaudoClienteId,
  });

  const listaExames: IExames[] | null = Array.isArray(examesFetch?.data)
    ? examesFetch.data
    : null;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={examesFetch.isFetching}
          onRefresh={() => {
            queryClient.invalidateQueries({ queryKey: ['examesKey'] });
          }}
        />
      }
    >
      <Container style={styles.container}>
        {!examesFetch.isFetching && !listaExames ? (
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
              <IconExame type='outline' />
            </View>
            <Text>Nenhum exame encontrado.</Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'column',
              flexGrow: 1,
              gap: 16,
              width: '100%',
            }}
          >
            {listaExames &&
              listaExames.map((exame) => (
                <TouchableWithoutFeedback
                  key={exame?.intLaudoClienteId}
                  onPress={async () => {
                    if (exame.bolLiberado == 'S') {
                      setExameSelecionado(exame);
                      setTimeout(() => {
                        if (
                          downloadExameFetch.isSuccess &&
                          downloadExameFetch?.data?.strLaudoPDF
                        ) {
                          shareFilePDF(
                            downloadExameFetch?.data?.strLaudoPDF,
                            exame.strDescrProcedimento
                          );
                          setExameSelecionado(null);
                        }
                      }, 500);
                    } else {
                      Toast.show({
                        type: 'info',
                        text1: 'Não é possível fazer o download de exame NÃO LIBERADO.',
                        position: 'bottom',
                      });
                    }
                  }}
                >
                  <Surface
                    elevation={1}
                    style={{ borderRadius: 12, padding: 14 }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                        }}
                      >
                        {downloadExameFetch.isFetching &&
                        exame.intLaudoClienteId ==
                          exameSelecionado?.intLaudoClienteId ? (
                          <ActivityIndicator animating={true} />
                        ) : exame.bolLiberado == 'S' ? (
                          <AntDesign name='pdffile1' size={24} color='#333' />
                        ) : (
                          <></>
                        )}
                      </View>
                      <View style={{ flexDirection: 'column', gap: 4 }}>
                        <Text
                          style={{
                            color: '#333',
                            fontWeight: '600',
                            fontSize: 14,
                          }}
                        >
                          {exame?.strDescrProcedimento}
                        </Text>
                        <Text style={{ fontSize: 14 }}>
                          {exame?.datLaudoCliente
                            ? moment(
                                exame?.datLaudoCliente,
                                'YYYY-MM-DD hh:mm:ss'
                              ).format('DD/MM/YYYY HH:mm')
                            : ''}
                        </Text>
                        <Text style={{ fontSize: 14 }}>
                          Dr(a). {exame?.strProfissional}
                        </Text>
                      </View>
                    </View>
                  </Surface>
                </TouchableWithoutFeedback>
              ))}
          </View>
        )}
      </Container>
    </ScrollView>
  );
}
