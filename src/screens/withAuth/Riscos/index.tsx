import { ScrollView, Text, View, RefreshControl } from 'react-native';
import { Container } from '../../../components/Container';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../../contexts/globalContext';
import { DataTable, Surface } from 'react-native-paper';
import useCustomQuery from '../../../hooks/useCustomQuery';
import { styles } from './styles';
import { useQueryClient } from '@tanstack/react-query';
import { RootStackParamList } from '../../../routes';
import { StackScreenProps } from '@react-navigation/stack';
import { IRiscos } from './types';
import Toast from 'react-native-toast-message';
import moment from 'moment';

type RiscosProps = StackScreenProps<RootStackParamList, 'riscos'>;

export default function Riscos({ navigation }: RiscosProps) {
  const { setCheckboxesEpi } =
    useContext(GlobalContext);
  const queryClient = useQueryClient();

  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([10]);
  const [itemsPerPage] = useState(
    numberOfItemsPerPageList[0]
  );

  const riscosFetch = useCustomQuery({
    key: 'riscosFetchKey',
    endpoint: '/usuarios/riscos',
    params: {
      // parametro: JSON.stringify({ "empresa": "521339", "codigo": "193004", "chave": "ad5c60e2af6fb7f63258", "tipoSaida": "json", "empresaTrabalho": "636781", "codigoFuncionario": "169" })
    },
  }
  );

  const sortByDateDescending = (array: any[]): any[] => {
    return array.sort((a, b) => {
      const dateA = moment(a.Data_Condicao, 'DD/MM/YYYY');
      const dateB = moment(b.Data_Condicao, 'DD/MM/YYYY');
      return dateB.diff(dateA);
    });
  };

  const epiDados: IRiscos[] | [] = Array.isArray(riscosFetch?.data) ? sortByDateDescending(riscosFetch.data) : [];

  if (!riscosFetch.isFetching && !riscosFetch.isSuccess) {
    Toast.show({
      type: 'error',
      text1: String(riscosFetch?.error?.message),
      position: 'bottom',
    });
  }


  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, epiDados.length);

  return (
    <Container>
      <Surface style={styles.surface} elevation={4}>
        <ScrollView refreshControl={
          <RefreshControl refreshing={riscosFetch.isFetching} onRefresh={() => {
            queryClient.invalidateQueries({ queryKey: ['riscosFetchKey'] });
          }} />
        }>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>
                <Text
                  style={{ color: '#8A8F9A', fontWeight: '600', fontSize: 16 }}
                >
                  Riscos
                </Text>
              </DataTable.Title>

            </DataTable.Header>

            {epiDados.length > 0 ? epiDados.slice(from, to).map((item: IRiscos, index) => (
              <DataTable.Row key={`${index}${item.Risco}`} style={{ backgroundColor: index % 2 == 0 ? '#fff' : '#f2f2fa' }}>
                <DataTable.Cell style={{ flex: 2, paddingVertical: 4, paddingRight: 4 }}>
                  <Text style={{ color: '#303746', fontWeight: '600', fontSize: 12 }}>
                    {item.Risco}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 2, paddingVertical: 4 }}>
                  <View>
                    <Text style={{ color: '#6B7280', fontWeight: '500', fontSize: 12 }}>
                      Dano: {item.Dano.replaceAll(/<[^>]*>/g, '')}
                    </Text>
                    <Text style={{ color: '#6B7280', fontWeight: '500', fontSize: 12 }}>
                      EPI: {item.Nome_EPI}
                    </Text>
                  </View>
                </DataTable.Cell>

              </DataTable.Row>
            )) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 8,
                  minHeight: '50%'
                }}
              >
                <Text>Nenhum item encontrado.</Text>
              </View>
            )}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(epiDados.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} de ${epiDados.length}`}
              numberOfItemsPerPageList={[10]}
              numberOfItemsPerPage={itemsPerPage}
              showFastPaginationControls
            />
          </DataTable>
        </ScrollView>
      </Surface>
    </Container>
  );
}
