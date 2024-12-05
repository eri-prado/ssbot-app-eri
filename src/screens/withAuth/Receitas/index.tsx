import {
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useContext, useState } from 'react';
import { Container } from '../../../components/Container';
import { NavigationProp } from '@react-navigation/native';
import { styles } from './styles';
import { ActivityIndicator, Surface } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import IconReceita from '../../../../assets/icons/IconReceita';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { GlobalContext } from '../../../contexts/globalContext';
import useCustomQuery from '../../../hooks/useCustomQuery';
import { IReceitas } from './types';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { shareFilePDF } from '../../../helpers/shareFilePDF';

interface IReceitasProps {
  navigation: NavigationProp<any>;
}

export default function Receitas({ navigation }: IReceitasProps) {
  const { userData } = useContext(GlobalContext);
  const queryClient = useQueryClient();
  const [receitaSelecionada, setReceitaSelecionada] =
    useState<null | IReceitas>(null);

  const receitasFetch = useCustomQuery({
    key: 'receitasKey',
    endpoint: '/usuarios/receitas',
    params: {},
  });

  const downloadReceitaFetch = useCustomQuery({
    key: 'receitaDownloadKey',
    endpoint: `/usuarios/receitas/${receitaSelecionada?.intPDFReceitaId}/download`,
    params: {},
    enabled: !!receitaSelecionada?.intPDFReceitaId,
    response: (res) => {
      if (res.status == 200 && res.data?.imgPDF) {
        shareFilePDF(
          res.data?.imgPDF,
          'receita - ' +
            receitaSelecionada?.strProfissional +
            ' - ' +
            receitaSelecionada?.datPDFReceita
        );
      }
    },
  });

  async function createAndSharePDF(dadosReceita: any) {
    const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          @page {
            size: A4;
            margin: 20mm;
          }
          body { font-family: Arial, sans-serif; box-sizing: border-box; }
          h1 { color: #333; }
          p { color: #666; }
          .title {
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 30px;
          }
          .subtitle {
            font-size: 16px;
            margin-bottom: 30px;
          }
          .content {
            font-size: 14px;
            margin-top: 10px;
          }
          .footer {
            font-size: 16px;
            margin-top: 90px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="title">
          RECEITUÁRIO
        </div>
        <div class="subtitle">
          Para: ${userData?.strAppUsuario}
        </div>
        <div class="content">
          ${dadosReceita.strReceituario}
        </div>
        <div class="footer">
         ${dadosReceita.strProfissional}
         <br />
         CRM: ${dadosReceita.strNumeroConselho} - ${dadosReceita.strEstadoConselho}
        </div>
      </body>
    </html>
  `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    if (Platform.OS === 'android') {
      const contentUri = await FileSystem.getContentUriAsync(uri);
      IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: contentUri,
        flags: 1,
        type: 'application/pdf',
      });
    } else {
      await Sharing.shareAsync(uri);
    }
  }

  const listaReceitas: IReceitas[] | null = Array.isArray(receitasFetch?.data)
    ? receitasFetch.data
    : null;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={receitasFetch.isFetching}
          onRefresh={() => {
            queryClient.invalidateQueries({ queryKey: ['receitasKey'] });
          }}
        />
      }
    >
      <Container style={styles.container}>
        {!receitasFetch.isFetching && !listaReceitas ? (
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
              <IconReceita type='outline' />
            </View>
            <Text>Nenhuma receita encontrado.</Text>
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
            {listaReceitas &&
              listaReceitas.map((receita: IReceitas) => (
                <TouchableWithoutFeedback
                  key={receita?.intPDFReceitaId}
                  onPress={async () => {
                    setReceitaSelecionada(receita);

                    if (!downloadReceitaFetch.isFetching) {
                      setTimeout(() => {
                        downloadReceitaFetch.refetch();
                      }, 300);
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
                        {downloadReceitaFetch.isFetching &&
                        receita.intPDFReceitaId ==
                          receitaSelecionada?.intPDFReceitaId ? (
                          <ActivityIndicator animating={true} />
                        ) : (
                          <AntDesign name='pdffile1' size={24} color='#333' />
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
                          Profissional: {receita?.strProfissional}
                        </Text>
                        <Text style={{ fontSize: 14 }}>
                          {receita?.datPDFReceita
                            ? moment(
                                receita?.datPDFReceita,
                                'YYYY-MM-DD hh:mm:ss'
                              ).format('DD/MM/YYYY HH:mm')
                            : ''}
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
